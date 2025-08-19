import express from "express";
import "dotenv/config"
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.use("/api/schools", schoolRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})