require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db('WaveTone-Db');
const productCollection = db.collection('Available-products');


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get("/products", async (req, res) => {
    try {
        const result = await productCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error });
    }
});


async function run() {
    try {
        // In serverless, we don't strictly need to await connect() 
        // as the driver handles it on the first request.
        console.log("MongoDB connection initialized");
    } catch (err) {
        console.error(err);
    }
}
run().catch(console.dir);


if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app; 