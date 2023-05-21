

const History = require('../Schema/UserSchema/HistorySchema/History');
const Lab = require('../Schema/UserSchema/LaboratorySchema/LabSchema');






exports.cropPredictInfo = async (req,res)=>{

    const userId = req.rootuser._id;
    const {values,crop  }  =req.body; 

    await History.findOneAndUpdate({userId},{$push:{cropPredicted:{crop,values}}})
    .then((use)=>{
        res.status(200).send("added in history");
    })
    .catch((err)=>{
        console.log(err);
        ser.status(500).send("internal server err");
    })

}


exports.getHistory = async (req,res)=>{
    const userId = req.rootuser._id;

     History.findOne({userId})
     .then((obj)=>{
        res.status(200).send(obj);
     })
     .catch((err)=>{
        console.log(err);
        res.status(404).send("history not found");
     })
}


exports.marketvisit = async(req,res)=>{
    const userId = req.rootuser._id;
    const {marketId , marketName} = req.body;

    History.findOneAndUpdate({userId},{$push:{MarketVisited:{marketId,marketName}}})
    .then((use)=>{
        res.status(200).send("added in history");
    })
    .catch((err)=>{
        console.log(err);
        ser.status(500).send("internal server err");
    })
}


exports.labvisit = async(req,res)=>{
    const userId = req.rootuser._id;
    const {laboratoryId , labName} = req.body;

    History.findOneAndUpdate({userId},{$push:{LaboratoryVisited:{laboratoryId,labName}}})
    .then((use)=>{
        res.status(200).send("added in history");
    })
    .catch((err)=>{
        console.log(err);
        ser.status(500).send("internal server err");
    })
}


exports.Nurseryvisit = async(req,res)=>{
    const userId = req.rootuser._id;
    const {nurseryId , nurseryName} = req.body;

    History.findOneAndUpdate({userId},{$push:{NurseryVisited:{nurseryId,nurseryName}}})
    .then((use)=>{
        res.status(200).send("added in history");
    })
    .catch((err)=>{
        console.log(err);
        ser.status(500).send("internal server err");
    })
}

