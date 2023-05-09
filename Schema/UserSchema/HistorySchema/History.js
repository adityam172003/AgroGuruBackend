

const mongoose  = require("mongoose")


const historySchema = new mongoose.Schema({

    userId:{
        type:String,
        required: true
    }   ,

    created_at:{type: Date, required: true, default: Date.now},

    cropPredicted:{
            type:String,

    },
    MarketVisited:{
        marketId:{
            type:String
        }
    },
    NurseryVisited:{
        nurseryId:{
            type:String
        }
    },

    LaboratoryVisited:{
        laboratoryId:
        {
            type:String
        }
    }

    
    


})