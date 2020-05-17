
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
// const users = ["pias" , "bappi" ,"monni" ,"shikhon" ,"liza"]
// app.get('/user/:id' ,(req ,res) =>{
//     const id =req.params.id
//     const name = users[id]
//     res.send({ id,name})
// })

app.get('/Products', (req, res) =>{
client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
client.connect(err =>{
    const collection = client.db("onlineStore").collection("products");
     collection.find({price:{$eq:'900'}}).limit(100) .toArray((err,documents ) =>{   
        if (err) {
            console.log(err);
           res.status(500).send({message:err}) 
        } else {
         res.send(documents)  
        }
     });
    
   })
   client.close();
});

// const atlasfor this project  username : pias and pass : aG7MWuubmyjqQAx



//post 

app.post('/addUser' ,(req ,res ) =>{
    client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
    const product =  req.body;

    client.connect(err =>{
       const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product , (err,result ) =>{   
           if (err) {
               console.log(err);
              res.status(500).send({message:err}) 
           } else {
            res.send(result.ops[0])  
           }
        });
       
      });
      client.close();
       
});

app.listen(process.env.DB_PORT, () => console.log(`pias i'm listening`));
