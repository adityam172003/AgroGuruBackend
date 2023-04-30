const Markets =require('../../Schema/UserSchema/MarketSchema/MarketSchema');


exports.addMarket = async(req,res)=>{

    const userId = req.rootuser._id
    let name     = req.body.data.name;
    let phone    = req.body.data.phone;
    let address  = req.body.data.address;
    let item     = req.body.data.item;
    let Quantity = req.body.data.Quantity
    let price    = req.body.data.price;


    
    
     const geometry={"type":"point","coordinates":[parseFloat(req.query.lng),parseFloat(req.query.ltd)]}
    if(!name||!address||!phone||!item||!geometry)
    {
      return  res.status(400).send("Invalid Information");
    }

    const obj = await Markets.findOne({userId});

    if(obj)
    {
       return res.status(200).send("nursery already exist");
    }
    

    const newMarkets = await new Markets({userId,name,address,phone,item,Quantity,price,geometry});

    await  newMarkets.save()
    .then((nur)=>{

        res.status(200).send("Market added successfully");
    })       
    .catch((err)=>{
        console.log(err);
        res.status(500).send("Internal server error");
    }) 
    
}  
 

exports.getMarket = async (req,res)=>{

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
                                                  
  Markets.aggregate(
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
           


exports.removeMarket = async (req,res)=>{

  const userId = req.rootuser._id;
 const obj = Markets.findOne({userId})


   await Markets.findByIdAndDelete({_id:obj._id})
   .then((del)=>{

      res.status(200).send("Market deleted");

   })
   .catch((err)=>{
    console.log(err);
    res.status(500).send("Internal server error");
   })

}

exports.updataMarket = async(req,res)=>{

      const userId = req.rootuser._id;


      const obj = await Markets.findOne({userId});

      if(!obj)
      {
       return res.status(404).send("Nursery not found");
      }
 
      Markets.findByIdAndUpdate(obj._id,req.body)
      .then((user)=>{
          res.status(200).json({message:"user info updated successfully"});
      })
      .catch(err =>{
        console.log(err)
          res.status(500).json({message:"internal server error"})
      })



}

// create function for addding image and items 