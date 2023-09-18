const userList = require('../model/UsersTODO')



const addList = async (req, res) => {
    const { title, description } = req.body

    await userList.create({
        Title: title,
        Description: description

    })
    console.log("List added")
    res.send("secessfully added")

}


const getList = async (req, res) => {
    const getAll = await userList.find()
    console.log(getAll)
    res.send("your data")

}


const patchList = async (req, res) => {

    const id = req.params.id
    const { title } = req.body
    try {

        const item = await userList.updateOne({_id:id},{Title:title})
      
        // item.Title = title
        
        res.send("data updated")

    }
    catch (err) {
        console.log(err)
        res.send("error there")
    }
}

const deleteList = async (req, res) => {
    const id = req.params.id

    try {
        await userList.deleteOne({ _id: id })

        // await userList.deleteMany({})    //to delte all the records from database 
        res.send("record deleted")
    }


    catch (err) {
        console.log(err)
        res.send("error while deleting")
    }
}


module.exports = { addList, getList, patchList, deleteList }
