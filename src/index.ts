import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

import db from "./config/db";
import authRoute from "./routes/auth"


app.use(express.json());
console.log("port number", process.env.PORT);

app.get("/", (req, res) => {
    res.send("Hi World"); 
}); 
  
//  routes 
app.use("/api/auth", authRoute);  
 

// database 
db.connect();



// server run port
app.listen(port, () => {
    console.log("app listening  ." ,port);
    
});



export default app;

