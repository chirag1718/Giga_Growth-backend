import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// Connection to DB
mongoose.set("strictQuery", true);
const db = process.env.DB_CONNECT;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // App connection
    const port = process.env.PORT || 8002;
    app.listen(port, () => {
      console.log("Server is up and running");
    }); 
    console.log("Connected to db ");
  })
  .catch((e) => console.log(e, "Mongo DB connection error"));

//  Middlewares
app.use(cors());
app.use(bodyParser.json());

// Route Imports
import dashboardRoute from "./routes/dashboard.js";

// Route Middleware
app.get("/health", (req, res) => {
  res.send("server is healthy");
});
app.use("/api/v1/dashboard", dashboardRoute);
