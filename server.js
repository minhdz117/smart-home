require("dotenv").config()
const express = require("express")
const app = express()
const FBA = require ("./src/facebook-api/facebook-api")

app.use(express.json({'content-type':'application/json'}))
app.use(express.urlencoded({ extended: false }))
app.use("/",FBA)

app.listen(3000,()=>{
    console.log("server listening in port 3000")
})