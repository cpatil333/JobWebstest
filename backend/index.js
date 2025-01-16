import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";

dotenv.config({});
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Fixed colon
  credentials: true, // Corrected key name
};

app.use(cors(corsOptions));

// Connect to MongoDB

let port = process.env.port || 8080;

///calling api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(port, () => {
  connectDB();
  console.log(`listening port ${port}`);
});
