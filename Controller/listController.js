const userList = require('../model/UsersTODO')
const userInfo = require('../model/usersInfo')

const jwt = require("jsonwebtoken");

const jwtToken = (email) => {
    return jwt.sign({ email }, "Api Secret Key", { expiresIn: "1d" });

}

const authorization = async (req, res, next) => {

    const token = req.headers.authorization
    console.log("token->", token)
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, "Api Secret Key")
        console.log("decoded token",decoded)
        const result = await userInfo.findOne({ email: decoded.email })
        console.log("result", result)

        if (result) {
            req.user = result
            next()
        }
        else {
            res.json({
                message: "wrong"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            message: "expired "
        })
    }
}


const addList = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.body)
    console.log("userid",req.user._id)
    try {
        const user = await userList.findOne({ userId: req.user._id });
        console.log("user",user)
        if (!user) {
            await userList.create({
                userId: req.user._id,
                todos: [
                    {
                        Title: title,
                        Description: description
                    }
                ]
            })     
        }
        else{
            user.todos.push({
                Title: title,
                Description: description
            });    
            await user.save();         
        }
        
        console.log("Todo added");
        res.status(201).json("added"); // Respond with the new todo
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding the todo" });
    }
};



const getList = async (req, res) => {
    console.log("get list")
    console.log("this is GETuser", req.user._id)

    const getAll = await userList.find({ userId: req.user._id })
    console.log(getAll)
    res.send(getAll)

}


const patchList = async (req, res) => {
    console.log("patchhhhh")
    const id = req.params.id
    const { description } = req.body
    try {

        // const item = await userList.updateOne({ _id: id }, { Description: description })

        // item.Title = title

        const result = await userList.updateOne(
            { userId: req.user._id, "todos._id": id }, // Find the user and the specific todo by its _id
            {
              $set: {
                "todos.$.Description": description, // Update the specific property of the todo
                // You can add more properties to update as needed
              }
            }
          );
          

        res.send("data updated")

    }
    catch (err) {
        console.log(err)
        res.send("error there")
    }
}

const deleteList = async (req, res) => {
   
    const id = req.params.id
    console.log("request  ",req.user._id)
   
    
    try {
        const result = await userList.updateOne(
            { userId: req.user._id },
            { $pull: { todos: { _id: id } } }
        );
        console.log(result)        
        console.log("Todo found");
        res.status(200).json({ message: "Todo  found" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting the todo" });
    }
  
}
const userLogin = async (req, res) => {

    console.log("hey there")
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const user = await userInfo.findOne({ email });
        console.log("hhhjjj   ", user)

        if (!user) {
            res.send("User not found. Please signup first");
        }
        else if (user.password === password) {
            const token = jwtToken(user.email);
            res.status(200).json({
                token: token
            });
        }
        else { res.send("incorrect password"); }


    }
    catch (err) {
        console.log(err)
        res.send("error while logging in ")
    }
}

const userSignup = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const g = await userInfo.findOne({ email })
        if (g == null) {

            await userInfo.create({ email, password })
            const token = jwtToken(email);
            res.status(200).json({
                token: token
            })
        }
        else {
            res.send("Email already registered.Please login")
        }
    }
    catch (err) {
        console.log(err)
        res.send("error while signing up")
    }
}

module.exports = { addList, getList, patchList, deleteList, userSignup, userLogin, authorization }
