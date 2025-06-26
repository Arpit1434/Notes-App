const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()
connectToMongo()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
   next();
});
app.use(express.json())

// Available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
    console.log(`Notes App Backend listening at http://localhost:${port}`)
})