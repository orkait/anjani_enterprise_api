import express from 'express';
import { SingleProduct } from "../models/product.model";
import Ajv from 'ajv';

const router = express.Router();
const ajv = new Ajv();

// Define the JSON schema for product validation
const productSchema = {
    type: 'object',
    properties: {
        productTitle: { type: 'string' },
        productLink: { type: 'string' },
        productDescription: { type: 'string' },
        productBrandName: { type: 'string' },
        productHighlights: { type: 'string' },
        productAttributes: { type: 'string' },
    },
    required: ['productLink'],
    additionalProperties: false
};

// Create a validator function using the compiled schema
const validateProduct = ajv.compile(productSchema);

// Create a single product
router.post('/product', async (req, res) => {
    try {
        // Validate the request body against the product schema
        const valid = validateProduct(req.body);
        if (!valid) {
            return res.status(400).json({ error: validateProduct.errors });
        }

        // check if product already exists
        // if its does then update it else create new
        try {
            const existResult = await SingleProduct.exists({
                productLink: req.body.productLink
            })

            if (existResult) {
                const product = await SingleProduct.findOneAndUpdate({
                    productLink: req.body.productLink
                }, req.body, { new: true });
                if (!product) {
                    return res.status(404).json({
                        msg: 'Product not found',
                        status: 'failed'
                    });
                }
            } else {
                const product = new SingleProduct(req.body);
                await product.save();
            }
            return res.json({
                msg: 'Product updated successfully',
                status: 'success'
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Error while updating product',
                status: 'exited'
            });
        }
    } catch (err) {
        res.status(400).json({
            msg: 'Error while creating product',
            status: 'exited',
            error: err.message
        });
    }
});

router.get('/product/:path', async (req, res) => {

    const { path } = req.params;

    if (!path){
        return res.status(400).json({
            msg: 'Invalid path',
            status: 'failed'
        });
    }

    try {
        const product = await SingleProduct.findOne({
            productLink: path
        })
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({
            msg: 'Product found',
            status: 'success',
            data: product
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error while getting product',
            error: err.message,
            status: 'exited'
        });
    }

});

// Delete a single product by ID
router.delete('/product/:id', async (req, res) => {
    try {
        const product = await SingleProduct.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;