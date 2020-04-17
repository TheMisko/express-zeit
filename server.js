const express = require("express");
var bodyParser = require("body-parser");
const Orders = require("./db");
var cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

// Body parser
app.use(express.json()); // parse incoming Request Object as a JSON Object

// Home route
app.get("/", (req, res) => {
  res.send("<h1>A very basic Express app deployed on Zeit Now</h1>");
});

// Mock APIs
app.get("/technologies", (req, res) => {
  res.json([
    { name: "React", maintainer: "Facebook" },
    { name: "Angular", maintainer: "Google" },
    { name: "Angular", maintainer: "Google" },
  ]);
});

app.get("/orders", (request, response) => {
  Orders.find({}).then((orders) => {
    response.json(orders.map((order) => order.toJSON()));
    console.log(orders);
  });
});

app.post("/postOrder", (request, response, next) => {
  const { naziv, cena, datum } = request.body;
  console.log(request.body);

  const orders = new Orders({
    naziv: naziv,
    cena: cena,
    datum: datum,
  });

  orders
    .save()
    .then((savedOrder) => {
      response.json(savedOrder.toJSON());
    })
    .catch((error) => next(error));
});

app.get("/test", (req, res) => {
  res.json([
    { name: "React", maintainer: "Facebook" },
    { name: "Angular", maintainer: "Google" },
  ]);
});

app.post("/technology", (req, res) => {
  const { name, maintainer } = req.body;

  res.send({ status: "Technology added", name, maintainer });
});

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is ready on port ${port}`);
});
