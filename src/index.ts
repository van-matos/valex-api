import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT: Number = Number(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});