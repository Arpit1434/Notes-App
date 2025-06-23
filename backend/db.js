const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const mongoURI = process.env.DB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, {dbName: "notesapp"})
    .then(() => {
        console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo