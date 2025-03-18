const mongoose = require('mongoose');
const cowsay = require("cowsay");

// Database detail
const dbName = "managetasks"

// Connection URi
const uri = process.env.NODE_ENV === "local" ? `mongodb://localhost:27017/${dbName}` : process.env.MONGODB_ATLAS_DB;

mongoose.connect(uri)
.then((response) => {
    if(response) {
        console.log(cowsay.say({
                    text : "Connection to database is successful",
                    e : "oO",
                    T : "U "
                }))
    }
}).catch((err) => {
    console.log(err)
})