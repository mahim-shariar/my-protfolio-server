const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 9999;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://My-protfolio:6n8j2sxD0SpGD0x6@cluster0.o6whk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        const database = client.db('my-protfolio')
        const projectCollection = database.collection('projects')

        app.post('/project',async(req,res)=>{
            const alldata = req.body;
            const result = await projectCollection.insertOne(alldata);
            res.json(result) 
        })
        app.get('/project',async(req,res)=>{
            const cursor = await projectCollection.find({});
            const result = await cursor.toArray();
            res.json(result)
        })
        app.get('/project/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await projectCollection.findOne(query);
            res.json(result)
        })
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('api start')
})
app.listen(port,()=>{
    console.log('server start ',port);
})
