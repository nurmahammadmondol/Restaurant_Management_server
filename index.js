require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.RM_USER}:${process.env.RM_PASS}@cluster0.ackxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('Restaurant_Management');
    const AllFoods = database.collection('All_Foods');

    app.get('/AllFoods', async (req, res) => {
      const All_Food = AllFoods.find();
      const result = await All_Food.toArray();
      res.send(result);
    });

    // Add Data client site & push database.
    app.post('/AllFoods', async (req, res) => {
      const Data = req.body;
      console.log('server data add', Data);
      const result = await AllFoods.insertOne(Data);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World server site ready!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
