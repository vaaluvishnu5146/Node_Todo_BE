const mongoose = require('mongoose');
const cowsay = require("cowsay");

// Connection URi
const uri = 'mongodb://localhost:27017';

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