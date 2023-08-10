import env from "@/env";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "@/router/product.router";


const app = express();
app.use(express.json({ limit: "0.5mb" }));

app.use(
    cors({
        origin: "*",
    })
);

app.use(async (req, res, next) => {
    const body = req.body as any;
    const testkey = (req.headers["x-test-key"] || "") as string;

    (req as any).locals = {
        hash: body?.options?.hash === true,
        compress: body?.options?.compress === true,
        encrypt: body?.options?.encrypt === true,
        decrypt: body?.options?.decrypt === true,

        owner: "default",
        role: "member",
        user: {},

        checks: {
        },
        headers: {
            testkey: testkey,
        },
    };
    return next();
});


app.use("/products", productRouter);

app.get("*", (req, res) => {
    return res.status(404).send({
        msg: "no route found",
    });
});

let cachedDB;
async function connectToDatabase(uri) {
    if (!cachedDB) {
        cachedDB = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
        });
    }
}

export async function connect() {
    await connectToDatabase(env.DB_URL);
}

app.listen(process.env.PORT || 2000, async () => {
    await connect();
    console.log(`Listening on port ${process.env.PORT || 2000}`);
})