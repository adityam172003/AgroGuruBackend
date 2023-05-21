

const mongoose  = require("mongoose")


const historySchema = new mongoose.Schema({

    userId:{
        type:String,
        required: true
    }   ,

   

    cropPredicted:[{
            crop:{type:String},
            values:{},
            created_at:{type: Date, required: true, default: Date.now},

    }],
    MarketVisited:[
       {
        marketId:{
            type:String
        }
        ,
        marketName:{
            type:String
        },
        created_at:{type: Date, required: true, default: Date.now}

       }
    ],
    NurseryVisited:[
       {
        nurseryId:{
            type:String
        },
        nurseryName:{
            type :String
        },
        created_at:{type: Date, required: true, default: Date.now}

       }
    ],

    LaboratoryVisited:[
       { laboratoryId:
        {
            type:String
        },
        labName:{
            type :String
        }
        ,
        created_at:{type: Date, required: true, default: Date.now}

    }
    ]

    
})






const History=mongoose.model('HISTORY',historySchema);
module.exports=History;