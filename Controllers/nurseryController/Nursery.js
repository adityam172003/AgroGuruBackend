
const Nursery =require('../../Schema/UserSchema/NurserySchema/NurserySchema');


exports.addNursery = async(req,res)=>{

    const userId = req.rootuser._id
    let name     = req.body.data.name;
    let phone    =req.body.data.phone;
    let address  = req.body.data.address;
    let timing   = {
        opening:req.body.data.openTime,
        closing:req.body.data.closeTime
    }
    let available = "true"



    
    
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
    

    const newNursery = await new Nursery({userId,name,address,phone,timing,available,geometry});

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
           