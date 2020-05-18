///==========================
//Puerto 
//===========================
process.env.NODE_ENV = process.env.NODE_ENV || 3000;

// =========================
// Entorno
// =========================
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "localhost27017/cafe"
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// mongodb: //localhost27017/cafe ---->>>local

//     mongodb: //mongodb+srv://sergio:9JmLk861jFLRCdKD@cluster0-dbr4w.mongodb.net/cafe ---->produccion