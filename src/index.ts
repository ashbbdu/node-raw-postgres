import express, { json } from "express";
import userRoutes from "./routes/User"
const app = express();

app.use(express.json());

const PORT = 4000;


app.get("/" , (req , res) => {
    res.send("Running !")
})

app.use("/api/v1" , userRoutes)


app.listen(PORT , () => {
    console.log("App is up and running");
    
})  