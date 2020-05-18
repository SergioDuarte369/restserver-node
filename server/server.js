require("./config/config");


const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); ////Cada vez que veamos .use, estamos ante un middleware 

//parse application/json
app.use(bodyParser.json());


app.get("/usuario", function(req, res) {
    res.json("get Usuario")
})


app.post("/usuario", function(req, res) { ////Utilizado para crear registros

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        });

    } else {
        res.json({
            persona: body
        })
    }

})
app.put("/usuario/:id", function(req, res) { ////Utilizado para actualizar registros

    let id = req.params.id;

    res.json({
        id
    })
})
app.delete("/usuario", function(req, res) { ////Utilizado para eliminar registros
    res.json("delete Usuario")
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto: ", 3000);

});