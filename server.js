



var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var Bear=require('./models/bear');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var host = (process.env.VCAP_APP_HOST || 'localhost');
var port=(process.env.VCAP_APP_PORT) ||8080;

var router=express.Router();

router.use(function(req,res,next){

//console.log('somethings is happending');
next();    
    
});

router.route('/bears').post(function(req,res){
    
    var bear=new Bear();
    bear.name=req.body.name;
    bear.numberid=req.body.numberid;
  //  console.log(bear.name);
    
    bear.save(
        function(err){
            
            if(err)
            res.send(err);
            
            res.json({message:'Bear Created!'});
        }
        
        
    )
    })
    .get(function(req,res){
        
        Bear.find(function(err,bears)
        {
            
             if (err)
                res.send(err);

            res.json(bears);
        });
        
      });
    
    
    

router.route('/bears/:bear_id')

.get(function(req,res){
    
    Bear.findById(req.params.bear_id,function(err,bear){
        if(err)
        res.send(err);
        res.json(bear);
        
    });

})

.put(function(req,res){
    
    Bear.findById(req.params.bear_id,function(err,bear)
    {
        if(err)
        res.send(err);
        
        bear.name=req.body.name;
        
        bear.save(function(err){
            
            if(err)
            res.send(err);
            
            res.json({message:'Bear is updated'});
            
        });
    });   
})

   .delete(function(req,res){
       
       
       Bear.remove({_id:req.params.bear_id},function(err,bear){
                      
                      if(err)
                      res.send(err);
                      
                      res.json({message:"bear is deleted"});           
           
           
       });
       
       
       
   });







router.get('/',function(req,res){
    
    res.json({message:'welcome! hello world' });
    
});




app.use('/api',router);



app.listen(port, host, function() {
});

