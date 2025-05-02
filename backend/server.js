const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const cors = require('cors')


// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'portpass';
//database connection
async function connectDB(){
    try{
        await client.connect()
        console.log("Connected to MongoDB")
    }catch(err){
        console.error("Error connecting to MongoDB", err)
    }
}
connectDB();


//get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const findResult = await collection.find({}).toArray();
    res.send(findResult)
})
//save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const insertResult = await collection.insertOne(password);
    res.send({success: true, result: insertResult})
})

//delete a password
app.delete('/', async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords")
    const deleteResult = await collection.deleteOne(password);

    res.send({success: true,result: deleteResult,deleteCount: deleteResult.deletedCount})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})