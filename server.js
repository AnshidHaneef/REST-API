const express = require('express')
const helper = require('./helper/productHelper')
require('dotenv').config()
const db = require ('./config/connections')

const app = express();
app.use(express.json())



app.get('/',(req,res)=>{
    res.send('Express App started ..')
})


// Add Product to database
app.post('/product',async(req,res)=>{
    try {
        const Product = await helper.addProduct(req.body)
        res.status(200).json(Product)
    } catch (error) {
        console.log(error);
    }
})

// Get Product from Database 
app.get('/product',async(req,res)=>{
    try {
        let product = await helper.getProduct()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Get One product 
app.get('/product/:id',async(req,res)=>{
    let id = req.params.id
    try {
        let product = await helper.getOneProduct(req.params.id)
        res.status(200).json(product)
    } catch (error) {
      res.status(500).json({message: error.message})  
    }
})


// Edit a Product 
app.put('/product/:id',async(req,res)=>{
    let id = req.params.id
    let body = req.body
    try {
        let product = await helper.editProduct(id , body)
        let updatatdProduct = await helper.getOneProduct(id)
        if (!product) {
            res.status(404).json({message:`cannot find product with this id: ${id} `})
        }
        res.status(200).json(updatatdProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Delete a product
app.delete('/product/:id',async(req,res)=>{
    let id = req.params.id
    try {
    let product = await  helper.deleteProduct(id)
    if (!product) {
        res.status(404).json({message:`cannot find product with this id: ${id} `})
    }
        res.status(200).json({"successfully Deleted ":product})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


    app.listen(3000,()=>{
        console.log('server running on  port: http://localhost:3000');
    });


