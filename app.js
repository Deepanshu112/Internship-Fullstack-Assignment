// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path  = require("path");
// const methodOverride = require("method-override");
// const hbs = require("hbs");
// const collection = require("./mongodb.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(() => {
//         console.log("Connected to DB");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));
// app.use(express.json());

// app.get("/", async (req, res) => {    
//     res.render("listings/login.ejs");
// });

// app.get("/signup", async (req, res) => {    
//     res.render("listings/signup.ejs");
// });

// app.post("/signup", async(req, res) => {

//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     await collection.insertMany([data])

//     const allListings = await Listing.find({});
//     res.render("listings",{allListings})
// })

// app.post("/login", async(req, res) => {
//     try{
//         const check = await collection.findOne({ name: req.body.name});
//         if(check.password === req.body.password){
//             res.redirect("/listings");
//         }else{
//             res.send("Wrong Password");
//         }
//     }
//     catch{
//         res.send("Wrong Details");
//     }
// })

// app.get("/listings", async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", {allListings})
// });

// app.get("/listings/new", (req, res) => {
//     res.render("listings/new.ejs")
// });

// app.get("/listings/:id", async (req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("Listings/show.ejs",{ listing });
// });

// app.post("/listings", async (req, res) => {
//     // let{title, description, image, price, country, location} = req.body;
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//     // console.log(listing);
// });

// app.get("/listings/:id/edit", async(req, res) =>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// })

// app.put("/listings/:id", async(req, res) => {
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// })

// app.delete("/listings/:id", async(req, res) => {
//     let {id} = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
// })

// // app.get("/testListing", async(req, res) => {
// //     let sampleListing = new Listing({
// //         title: "My New Villa",
// //         description: "This is a beautiful villa in the heart of Paris",
// //         price: 1000000,
// //         location: "75001 Paris",
// //         country: "France",
// //     });
// //     await sampleListing.save();
// //     console.log("Saved sample");
// //     res.send("Successful testing");
// // });

// app.listen(8080, () => {
//     console.log("Server is running on port 8080");
// })

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const hbs = require("hbs");
const connectDB = require("./db");
const collection = require("./mongodb");
const Listing = require("./models/listing");

// Connect to MongoDB
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("listings/login.ejs");
});

app.get("/signup", async (req, res) => {
    res.render("listings/signup.ejs");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    await collection.insertMany([data]);

    const allListings = await Listing.find({});
    res.render("listings", { allListings });
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check.password === req.body.password) {
            res.redirect("/listings");
        } else {
            res.send("Wrong Password");
        }
    } catch {
        res.send("Wrong Details");
    }
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/show.ejs", { listing });
});

app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
