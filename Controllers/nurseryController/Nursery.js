
const { findOneAndUpdate } = require('../../Schema/UserSchema/CommonSchema/Userschema');
const Nursery =require('../../Schema/UserSchema/NurserySchema/NurserySchema');
const uploadMiddleware = require("../../Middleware/AdminMiddleware/MulterMiddleware")

exports.addNursery = async(req,res)=>{

    const userId = req.rootuser._id
    let name     = req.body.name;
    let phone    =req.body.phone;
    let address  = req.body.address;
    let timing   = {
        opening:req.body.openTime,
        closing:req.body.closeTime
    } 
    let available = "true"
    
    let nurseryImage =  req.file.filename;
  // console.log(name);
  // console.log(nurseryImage)
    


    
    
     const geometry={"type":"point","coordinates":[parseFloat(req.query.lng),parseFloat(req.query.ltd)]}
    if(!name||!address||!phone||!timing||!available||!geometry)
    {
      return  res.status(400).send("Invalid Information");
    }

    const obj = await Nursery.findOne({userId});

    if(obj)
    {
       return res.status(200).send("nursery already exist");
    }
    

    const newNursery = await new Nursery({userId,name,address,phone,timing,available,geometry,nurseryImage});

    await  newNursery.save()
    .then((nur)=>{

        res.status(200).send("Nursery added successfully");
    })       
    .catch((err)=>{
        console.log(err);
        res.status(500).send("Internal server error");
    }) 
    
    
}  
 

exports.getNursery = async (req,res)=>{

    // Nursery.geoNear(
    //     {type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]}
    //     ,
    //     {maxDistance:100000,spherical:true}
                                              
    // ).then((inja)=>{
    //     res.send(inja)
    // });     

  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
//   var maxDistance = parseFloat(req.query.maxDistance);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  console.log('point: ' + point+lng+lat)
//   var geoOptions = {
//     spherical:true,
//     maxDistance:100000,
//     num: 1
//   };
                                                  
  Nursery.aggregate(
    [{
      '$geoNear': {
        'near': point,
        'spherical': true,
        'distanceField': 'dist.calculated',
        'maxDistance': 10000000
      }
    }],
  
  )  
  .then((nur)=>{
    res.send(nur)
  })
  .catch((err)=>{
    console.log(err);
    res.send("Internal server error")
  })                                                                             
/*                          
                                 
    Nursery.aggregate([
        { 
            $geoNear: {
                near: 'Point',
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true                
            }
        }
    ]).then((res)=>{
        res.send(res);
    }).catch((err)=>{
        console.log(err);                              
        res.send("Internal server err");
    });
// })
    */

}            
           

02
exports.removeNursery = async (req,res)=>{

  const userId = req.rootuser._id;
  const obj = await Nursery.findOne({userId})

   await Nursery.findByIdAndDelete({_id:obj._id})
   .then((del)=>{

      res.status(200).send("Nursery deleted");

   })
   .catch((err)=>{
    console.log(err);
    res.status(500).send("Internal server error");
   })

}

exports.updataNursery = async(req,res)=>{

      const userId = req.rootuser._id;


      const obj = await Nursery.findOne({userId});

      if(!obj)
      {
       return res.status(404).send("Nursery not found");
      }
 
      Nursery.findByIdAndUpdate(obj._id,req.body)
      .then((user)=>{
          res.status(200).json({message:"user info updated successfully"});
      })
      .catch(err =>{
        console.log(err)
          res.status(500).json({message:"internal server error"})
      })



}

exports.ItemsImageuploads = async(req,res)=>{

  const userId = req.rootuser._id;
  console.log(req.body);
  const obj = await Nursery.findOne({userId});
  const photo = req.file.filename;
  const itemname = req.body.name;
  const item={
    itemname,photo
  }
  console.log(item);

  await Nursery.findByIdAndUpdate({_id:obj._id},{ $push:{Items:{itemname,photo}}})
  .then(
   ()=>{
    res.status(201).send("item added successfully");
   } 
  )
  .catch((err)=>{
    console.log(err);
    res.status(500).send("Internal server error");
  })

}



exports.nurseryItems = async(req,res)=>{
  const allPhotos = await Nursery.find();
  res.send(allPhotos);  
}



exports.getnurserybyId = async(req,res)=>{
  const nurseryId = req.query.id;

  Nursery.findOne({_id:nurseryId})
  .then((obj)=>{
    res.status(200).send(obj);

  })
  .catch((err)=>{
    console.log(err);
    res.status(404).send("Not found");

  })

}


exports.userNursery = async(req,res)=>{
  userId = req.rootuser._id;
  console.log("call");
  const obj = await Nursery.findOne({userId})
  if(obj)
  {
    res.status(200).send(obj);
  }
  else
  {
    res.status(404).send("No nursery");
  }
}