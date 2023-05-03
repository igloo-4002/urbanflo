import bodyParser from "body-parser";
import express from "express";
import multer from "multer";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Set up Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
