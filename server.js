const mongoose = require('mongoose');



const connectAndListen = async (app) => {
    try {
        await mongoose.connect(process.env.URI)

        console.log("Db Connected")

        app.listen(process.env.PORT, () => {
            console.log("server started")
        })
    }
    catch (err) {
        console.log("There's an error", err);
    }

}
module.exports = connectAndListen