const express = require("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const mongoose = require ("mongoose");

dotenv.config();
const app =express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected")).catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));