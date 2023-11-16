const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2mmen1j.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection

        // --------------collections-----------------
        const courseCollection = client.db('CourseDB').collection('courses');



        // -------------------------------------------Courses------------------------------------------------------
        app.get('/courses/:id', async (req, res) => {
            const category = req.params.id;
            const filter = { courseCategory: category };
            const result = await courseCollection.find(filter).toArray();
            res.send(result);
        })

        app.get('/all_courses', async (req, res) => {
            const cursor = courseCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('GoZayaan server is flying');
})

app.listen(port, () => {
    console.log(`GoZayaan server is flying on port: ${port}`);
})