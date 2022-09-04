import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";

import handleError from "./middlewares/errorHandler";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleError);

const PORT: number = Number(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});