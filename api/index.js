import express  from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";


dotenv.config();

mongoose.connect(process.env.MONGOURL)
.then(()=>{

    console.log("DB connected successfully");
}).catch((err)=> {

    console.log(err);
});

const app = express();
app.listen(3000, () =>{
    console.log("listening to port 3000");
});

app.use('/api/user',userRoutes);