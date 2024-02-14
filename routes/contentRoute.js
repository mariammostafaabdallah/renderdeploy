const express = require('express');
const route=express.Router();
const Content=require('../models/Content');


//==============================add product =================================//
// ==========================================================================//
route.post('/addcontent',async function(req,res)
{ 


    let addcontent= await Content.create({
        
        description:req.body.description,
         
    });
    

    if(addcontent)
    {
        res.json({
            message: "Successfull added content",
            status: 200,
            data: addcontent,
            success: true,
        });
    }
    else
    { 
        res.json({
            message: "can not add content",
            status: 400,
            data: exist,
            success: false,
        });
    }    
})

//==============================get content=================================//
// ==========================================================================//
route.get("/content", async function (req, res) {
    const content = await Content.find({});
    res.json({
        message: "content",
        status: 200,
        data: content,
        success: true,
    });
});


module.exports=route;