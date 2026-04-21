const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected ✅");

    const db = mongoose.connection.db;

    console.log("DB NAME:", db.databaseName);

    const collections = await db.listCollections().toArray();

    console.log("COLLECTIONS:", collections);

    process.exit();
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
