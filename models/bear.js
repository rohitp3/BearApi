var mongoose=require('mongoose');
var Schema =mongoose.Schema;

var BearSchema=new Schema({
    name:String,
    numberid:Number
});

module.exports=mongoose.model('Bear',BearSchema);
