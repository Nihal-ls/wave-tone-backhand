const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://Nihal:hdasjkfhadkshfdsa@wavetone.jpf1fel.mongodb.net/?appName=Wavetone";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})



async function run() {
    try {
        // await client.connect();
        // Send a ping to confirm a successful connection
        const db = client.db('WaveTone-Db')
        const productCollection = db.collection('Available-products')



        //   apis starts from here

        app.get("/products",async (req, res) => {
              const result = await productCollection.find().toArray()
              res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
