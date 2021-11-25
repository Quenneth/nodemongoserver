// server file 
const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

require("./app/routes/user.routes")(app);

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
    // set port, listen for requestss
    const Port = process.env.Port || 8080;
    app.listen(Port, () => {
        console.log(`Server is running on port ${Port}.`);
    });
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
