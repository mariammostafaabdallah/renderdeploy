const express = require('express');
const route=express.Router();
const Product=require('../models/Product');
const path=require('path');
const multer= require('multer');
const bodyParser = require('body-parser');
route.use(bodyParser.json());
route.use(express.static("../uploads"));

let filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true);
    } else {
        cb(new Error("Not image"), false);
    }
};
let upload = multer({
    storage:filestorage ,   
    fileFilter:multerFilter
    })
//==============================add product =================================//
// ==========================================================================//
route.post('/addproduct',upload.single('img'),bodyParser.urlencoded({extended:false }),async function(req,res)
{ 

    console.log(req.file);

    
    let addproduct= await Product.create({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        weight:req.body.weight,
         imageUrl:req.file?.filename
        
    });
    

    if(addproduct)
    {
        res.json({
            message: "Successfull added product",
            status: 200,
            data: addproduct,
            success: true,
        });
    }
    else
    { 
        res.json({
            message: "can not add product",
            status: 400,
            data: exist,
            success: false,
        });
    }    
})

//==============================get all product=================================//
// ==========================================================================//
route.get("/allprd", async function (req, res) {
    const products = await Product.find({});
    res.json({
        message: "all product",
        status: 200,
        data: products,
        success: true,
    });
});
//==============================get  one product by id=================================//
// ==========================================================================//
route.get("/getOne/:id", async function(req, res) {
    let data = await Product.findOne({_id:req?.params?.id})
    if(data){
        res.json({
            message: "get product",
            status: 200,
            data: data,
            success: true,
        });
    }
    else{
        res.json({
            message: "not exists",
            status: 400,
            data:  req.params.id,
            success: false,
        });
    }
})

//==============================delete product by id=================================//
// ==========================================================================//
route.delete('/delprd/:id',async function(req,res){

    let deletprd= await Product.deleteOne({_id:req?.params?.id})
    if(deletprd)
    {
        res.json({
            message: "Successfully deleted",
            status: 200,
            data: deletprd,
            success: true,
        });
    }
    else
    {
        res.json({
            message: "can not deleted",
            status: 400,
            data: exist,
            success: false,
        });
    }  
})
//==============================update product by id=================================//
// ==========================================================================//
route.put('/update/:id', upload.single('img'), async function (req, res) {
    try {
        console.log(req?.file)
        // let x = req.files.filename
      // Find the product by its ID and update its properties
        let product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                weight: req.body.weight,
                imageUrl: req.file?.filename      
            },
            { new: true } // Returns the updated product instead of the old one
        );
        res.json({
            message: 'Successfully updated the product',
            status: 200,
            data: product,
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while updating the product',
            status: 500,
            success: false,
        });
    }
}); 

module.exports=route;

