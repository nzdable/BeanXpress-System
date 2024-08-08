const express = require ("express")
const app = express()
const path = require ("path")
const collection = require("./mongodb")

app.use(express.json())
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}))

// GET ROUTE
app.get("/", (req,res)=>{
    res.render("login")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})


// POST ROUTE
app.post("/signup", async (req, res) => {
    try {
        console.log(req.body); // Log the request body to debug
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,

        };

        if (!data.firstName || !data.lastName || !data.email || !data.username || !data.password) {
            return res.status(400).send("All fields are required");
        }

        await collection.create(data);
        res.render("customerLanding", { naming: req.body.name });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ username: req.body.username });
        
        if (user && user.password === req.body.password) {
            res.render("customerLanding", { naming: req.body.username });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Server Error");
    }
});



// CHANGE NUMBER IN ACCORDANCE WITH LOCAL HOST
app.listen(5500, () => {
    console.log("port connected");
})