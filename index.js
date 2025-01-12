require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const AllFoods = client.db('Restaurant_Management').collection('All_Foods');
    const OrderFoods = client
      .db('Restaurant_Management')
      .collection('Order_Foods');

    app.get('/AllFoods', async (req, res) => {
      const CurrentPage = parseInt(req.query.CurrentPage);
      const parPageItem = parseInt(req.query.parPageItem);

      const All_Food = AllFoods.find()
        .skip(CurrentPage * parPageItem - parPageItem)
        .limit(parPageItem);
      const result = await All_Food.toArray();
      res.send(result);
    });

    app.get('/AllFoodsCount', async (req, res) => {
      const count = await AllFoods.estimatedDocumentCount();
      res.send({ count });
    });

    app.get('/AllFoods/:id', async (req, res) => {
      const ID = req.params.id;
      const RealID = { _id: new ObjectId(ID) };
      const result = await AllFoods.findOne(RealID);
      res.send(result);
    });

    // Add Data client site & push database.
    app.post('/AllFoods', async (req, res) => {
      const Data = req.body;

      const result = await AllFoods.insertOne(Data);
      res.send(result);
    });

    app.put('/AllFoods/:id', async (req, res) => {
      const filterID = req.params.id;
      const RealID = { _id: new ObjectId(filterID) };
      const Food = req.body;

      const updateProduct = {
        $set: {
          FoodName: Food.FoodName,
          FoodCategory: Food.FoodCategory,
          Price: Food.Price,
          FoodImage: Food.FoodImage,
          Quantity: Food.Quantity,
          Description: Food.Description,
        },
      };

      const result = await AllFoods.updateOne(RealID, updateProduct);
      res.send(result);
    });

    app.post('/OrderFoods', async (req, res) => {
      const Data = req.body;

      const result = await OrderFoods.insertOne(Data);
      res.send(result);
    });

    app.get('/OrderFoods', async (req, res) => {
      const Order_Foods = OrderFoods.find();
      const result = await Order_Foods.toArray();
      res.send(result);
    });

    app.get('/OrderFoods/:id', async (req, res) => {
      const ID = req.params.id;
      const RealID = { _id: new ObjectId(ID) };
      const result = await OrderFoods.findOne(RealID);
      res.send(result);
    });

    app.delete('/OrderFoods/:id', async (req, res) => {
      const RealID = req.params.id;
      const FilterID = { _id: new ObjectId(RealID) };
      const result = await OrderFoods.deleteOne(FilterID);
      res.send(result);
    });

    // app.delete('/OrderFoods');

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
