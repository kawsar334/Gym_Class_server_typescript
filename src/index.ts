import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

import db from "./config/db";
import authRoute from "./routes/auth"
import userRoute from "./routes/user"



app.use(express.json());
app.use(cookieParser()); 
console.log("port number", process.env.PORT);

app.get("/", (req, res) => {
    res.send("Hi World"); 
}); 
  
//  routes 
app.use("/api/auth", authRoute);  
app.use("/api/user", userRoute);  

 

// database 
db.connect();



// server run port
app.listen(port, () => {
    console.log("app listening  ." ,port);
    
});



export default app;

