const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

// RECEIVE ORDER
app.post("/order", (req, res) => {
  orders.push(req.body);
  console.log("New Order:", req.body);
  res.send({ message: "Order placed successfully" });
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
