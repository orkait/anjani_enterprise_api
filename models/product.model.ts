import mongoose from 'mongoose';

// Define the schema for the SingleProductType
const singleProductSchema = new mongoose.Schema({
    productTitle: String,
    productLink: String,
    productDescription: String,
    productBrandName: String,
    productHighlights: String,
    productAttributes: String
});

// Define the schema for the CategoryType
const categorySchema = new mongoose.Schema({
    categoryType: String,
    subCategory: [{
        subCategoryTitle: String,
        subCategoryLink: String,
        subCategoryProducts: [singleProductSchema]
    }]
});

// Create the Mongoose models based on the schemas
export const SingleProduct = mongoose.model('SingleProduct', singleProductSchema);
export const Category = mongoose.model('Category', categorySchema);


