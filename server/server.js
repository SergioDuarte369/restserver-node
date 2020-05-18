require("./config/config");


const express = require("express");
const mongoose = require("mongoose");

const app = express();


const bodyParser = require("body-parser");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); ////Cada vez que veamos .use, estamos ante un middleware 

//parse application/json
app.use(bodyParser.json());

app.use(require("./routes/usuario"));




mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;
        console.log("Base de datos ONLINE");


    });


app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto: ", 3000);

});