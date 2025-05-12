import express from "express";
import mongoose from "mongoose";
import {create_absence, getAbsences} from "./controllers/absenceController.js";

const app = express();
const PORT = 7000;

app.use(express.json());
app.get("/absences", getAbsences);
app.post("/absences", create_absence);

const {
  MONGO_DB_NAME,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_PORT,
} = process.env;
const MONGO_URI = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Api absence listening in port ${PORT}`);
});
