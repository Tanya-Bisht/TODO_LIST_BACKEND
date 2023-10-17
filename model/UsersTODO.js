const mongoose=require('mongoose')


const schema=mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    todos:[{ Title:String,
        Description:String}]
   
})


module.exports=mongoose.model("todos",schema)


