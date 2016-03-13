



var express=require('express');
var app=express();
var bodyParser=require('body-parser');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var Bear=require('./models/bear');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port=process.env.PORT||8080;

var router=express.Router();

router.use(function(req,res,next){

console.log('somethings is happending');
next();    
    
});

router.route('/bears').post(function(req,res){
    
    var bear1=new Bear();
    bear1.name=req.body.name;
    bear1.numberid=req.body.numberid;
    console.log(bear1.name);
    
    bear1.save(
        function(err){
            
            if(err)
            res.send(err);
            
            res.json({message:'Bear Created!'});
        }
        
        
    );
    
    
});




router.get('/',function(req,res){
    
    res.json({message:'welcome! hello world' });
    
});




app.use('/api',router);

app.listen(port);

console.log('magic happend on port:'+port);
