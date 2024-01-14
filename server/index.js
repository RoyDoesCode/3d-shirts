import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dalleRoute from "./routes/dalle.routes.js";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/dalle", dalleRoute);

app.get("/", (_, res) => {
    res.status(200).json({ message: "Hello from DALL.E" });
});

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
