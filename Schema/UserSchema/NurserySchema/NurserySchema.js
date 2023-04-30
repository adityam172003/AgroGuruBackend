const mongoose = require("mongoose");


const Geoschema = new mongoose.Schema({
    type:{
        default:"Point",
        type:String
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
})


const  NurserySchema=new mongoose.Schema({
    userId:{
        type :String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
  
    timing:
    {   
        opening:{
            type:String,
            required:true
        },

        closing:{
            type:String,
            required:true
        }
    },
    available:{
        type:Boolean,
        required:true
    },
    
    created_at    : { type: Date, required: true, default: Date.now }
     ,
    Items:[{
        itemname:{
            type:String,
             },
        photo:{
            type:String
        }
        }]
    
    ,
    geometry:Geoschema
})




 const Nursery=mongoose.model('NURSERY',NurserySchema);
 module.exports=Nursery;