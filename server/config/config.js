///==========================
//Puerto 
//===========================
process.env.PORT = process.env.PORT || 3000;

// =========================
// Entorno
// =========================
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "localhost27017/cafe"
} else {
    urlDB = "mongodb+srv://sergio:9JmLk861jFLRCdKD@cluster0-dbr4w.mongodb.net/cafe"
}

process.env.URLDB = urlDB;

// mongodb: //localhost27017/cafe ---->>>local

//     mongodb: //mongodb+srv://sergio:9JmLk861jFLRCdKD@cluster0-dbr4w.mongodb.net/cafe ---->produccion