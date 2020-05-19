
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
const users = ["pias" , "bappi" ,"monni" ,"shikhon" ,"liza"]
//load a single product to product details
app.get('/product/:key' ,(req ,res) =>{
    const key =req.params.key
client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
client.connect(err =>{
    const collection = client.db("onlineStore").collection("products");
     collection.find({key}).toArray((err,documents ) =>{   
        if (err) {
            console.log(err);
           res.status(500).send({message:err}) 
        } else {
         res.send(documents[0])  
        }
     });
    
   })
   client.close();

})
//lodaing multiple product to order review
app.post('/getProductKey' ,(req ,res) =>{
const key =req.params.key;
const productKeys =  req.body;
client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
client.connect(err =>{
   const collection = client.db("onlineStore").collection("products");
    collection.find({key: {$in:productKeys}}).toArray((err,documents ) =>{   
       if (err) {
           console.log(err);
          res.status(500).send({message:err}) 
       } else {
        res.send(documents)  
       }
    });
   
  })
  client.close();

})
//lodaing all product to shop
app.get('/Products', (req, res) =>{
client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
client.connect(err =>{
    const collection = client.db("onlineStore").collection("products");
     collection.find().toArray((err,documents ) =>{   
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


app.post('/placeOrder',(req ,res ) =>{
   client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
   const orderDetails =  req.body;
   orderDetails.orderTime = new Date(); 
   client.connect(err =>{
      const collection = client.db("onlineStore").collection("orders");
       collection.insertOne(orderDetails , (err,result ) =>{   
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


//post  allproduct to database
app.post('/addProduct' ,(req ,res ) =>{
    client = new MongoClient(uri, {useUnifiedTopology:true , useNewUrlParser: true});
    const product =  req.body;

    client.connect(err =>{
       const collection = client.db("onlineStore").collection("products");
        collection.insert(product , (err,result ) =>{   
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
 process.env.DB_PORT
app.listen(process.env.DB_PORT, () => console.log(`pias i'm listening`));
