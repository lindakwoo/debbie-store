import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./db.js";
import express from "express";
import cors from "cors";
import path from 'path';

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import stripeRoute from "./routes/stripeRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import ideaRoutes from "./routes/ideaRoutes.js";
import fs from 'fs';

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use('/api/checkout', stripeRoute);
app.use('/api/orders', orderRoutes);
app.use('/api/ideas', ideaRoutes)


app.get('/api/config/google', (req, res) => res.send(process.env.GOOGLE_CLIENT_ID));

// localhost:5555/api/products

const port = 5555;

const decode = () => {
  const linesArray = fs.readFileSync("server/textFile.txt").toString().split(String.fromCharCode(10));
  const numsArray = [];
  const obj = {};
  linesArray.forEach(line => {
    const tempArray = line.split(" ");
    obj[tempArray[0]] = tempArray[1];
    numsArray.push(Number(tempArray[0]));
  })

  numsArray.sort((a, b) => { return a - b })
  let step = 1;
  const pyramid = [];
  
  while (numsArray.length > 0) {
    const stepArray = numsArray.splice(0, step);
    pyramid.push(stepArray);
    step++;

  }

  let final = "";

  pyramid.forEach(arr => {
    final += ` ${obj[arr[arr.length-1]]}`
  })

};

decode();


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV == 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


app.get("/", (req, res) => {
  res.send("Api is running!!!...");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
