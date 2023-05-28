
const  Lab =require('../../Schema/UserSchema/LaboratorySchema/LabSchema');

// Data will come from form tag remember it 



exports.addLab = async(req,res)=>{

    const userId = req.rootuser._id

    console.log(req.body);
    let name     = req.body.name;
    let phone    =req.body.phone;
    let address  = req.body.address;
    let timing   = {
        opening:req.body.openTime,
        closing:req.body.closeTime
    }
    let available = "true"

    let laboratoryImage =  req.file.filename;

    
    
     const geometry={"type":"point","coordinates":[parseFloat(req.query.lng),parseFloat(req.query.ltd)]}
    if(!name||!address||!phone||!timing||!available||!geometry)
    {
      return  res.status(400).send("Invalid Information");
    }

    const obj = await Lab.findOne({userId});

    if(obj)
    {
       return res.status(200).send("nursery already exist");
    }
    

    const newNursery = await new Lab({userId,name,address,phone,timing,available,geometry,laboratoryImage});

    await  newNursery.save()
    .then((nur)=>{

        res.status(200).send("Lab added successfully");
    })       
    .catch((err)=>{
        console.log(err);
        res.status(500).send("Internal server error");
    }) 
    
}  
 

exports.getLab= async (req,res)=>{

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
                                                  
Lab.aggregate(
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
           


exports.removeLab = async (req,res)=>{

  const userId = req.rootuser._id;

   await Lab.findByIdAndDelete({_id:userId})
   .then((del)=>{

      res.status(200).send("Nursery deleted");

   })
   .catch((err)=>{
    console.log(err);
    res.status(500).send("Internal server error");
   })

}

exports.updataLab = async(req,res)=>{

      const userId = req.rootuser._id;


      const obj = await Lab.findOne({userId});

      if(!obj)
      {
       return res.status(404).send("Lab not found");
      }
 
      Lab.findByIdAndUpdate(obj._id,req.body)
      .then((user)=>{
          res.status(200).json({message:"user info updated successfully"});
      })
      .catch(err =>{
        console.log(err)
          res.status(500).json({message:"internal server error"})
      })



}





exports.ItemsImageuploadsLab = async(req,res)=>{

  const userId = req.rootuser._id;

  const obj = await Lab.findOne({userId});
  const photo = req.file.filename;
  const sname = req.body.sname;
  // const item={
  //   itemname,photo
  // }
  // console.log(item);

  await Lab.findByIdAndUpdate({_id:obj._id},{ $push:{Services:{sname,photo}}})
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




exports.getlabbyId = async(req,res)=>{
  const LabId = req.query.id;

  Lab.findOne({_id:LabId})
  .then((obj)=>{
    res.status(200).send(obj);

  })
  .catch((err)=>{
    console.log(err);
    res.status(404).send("Not found");

  })

}

exports.userLab = async(req,res)=>{
  userId = req.rootuser._id;
  console.log('user lab calles')
  const obj = await Lab.findOne({userId})
  if(obj)
  {
    res.status(200).send(obj);
  }
  else
  {
    res.status(404).send("No Lab");
  }
}


