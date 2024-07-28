// const { name } = require("ejs");
// const mongoose = require("mongoose");


// mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")
//     .then(() => {
//         console.log("Connected to DB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const LogInSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required: true
//     },
//     password:{
//         type:String,
//         required: true
//     }
// }) 

// const collection = new mongoose.model("Collection1",LogInSchema)

// module.exports = collection;

const mongoose = require("mongoose");

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("Collection1", LogInSchema);

module.exports = collection;
