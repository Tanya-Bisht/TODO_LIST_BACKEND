const userList=require('../model/Users')



const addList=async(req,res)=>{
    const {title,description}=req.body
  
    await userList.create({
        Title:title,
        Description:description

})
console.log("List added")
res.send("secessfully added")

}


const getList=async(req,res)=>{
    const getAll=await userList.find()
    console.log(getAll)
    res.send("your data")

}


const patchList=async(req,res)=>{
const {title}=req.body
try{

    const newList={
        title
    }
    const item=await userList.findOne({_id:req.params.id})
  console.log(item.Title);
  res.send("data updated")
}
catch(err){
    console.log(err)
    res.send("error there")
}
}


module.exports={addList,getList,patchList}
