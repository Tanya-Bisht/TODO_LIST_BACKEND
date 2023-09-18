const mongoose=require('mongoose')


const schema=mongoose.Schema({
    Title:String,
    Description:String
})

module.exports=mongoose.model("todo's",schema)


