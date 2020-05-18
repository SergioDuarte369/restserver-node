const express = require("express");

const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");

const app = express();




app.get("/usuario", function(req, res) {


    let desde = req.query.desde || 0; ///Tenemos que realizar FUtura comprobación para que sea un número
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, "nombre email role estado google img") ////Dentro del paréntesis podríamos mandar más parametros como google:true
        .skip(desde) /////Para que se salte los primeros 5 registros y nos muestre los 5 registros siguientes (limit(5))
        .limit(limite) ////Para limitar el número de registros que nos devuelve
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            })





        })

})


app.post("/usuario", function(req, res) { ////Utilizado para crear registros

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;


        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

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
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"])


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { ///findByIde, otro método que podríamos utilizar

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })


})
app.delete("/usuario:id", function(req, res) { ////Utilizado para eliminar registros

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndRemove(id, cambiaEstado, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })

});

module.exports = app;