const express=require("express");
const mongodb=require("mongodb");

const router=express.Router();

//Get states data
router.get('/',async (req,res)=>{
    //res.send("Hello My frnd!");
    const states=await loadStatesCollection();
    res.send(await states.find({}).toArray());
});



async function loadStatesCollection(){
    const client=await mongodb.MongoClient.connect('mongodb+srv://admin:admin@CovidTracker.adcjs.mongodb.net/CovidTracker?retryWrites=true&w=majority',{useNewUrlParser:true},{ useUnifiedTopology: true }); 
    
    return client.db('CovidTracker').collection('states');
}

module.exports = router;