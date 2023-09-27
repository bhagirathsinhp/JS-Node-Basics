const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const router = express.Router();

const url =
  "mongodb+srv://123bhagip:123edwardkenway@cluster0.dvnlutp.mongodb.net/locations?retryWrites=true&w=majority";

const client = new MongoClient(url);

const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  // const id = Math.random();

  client.connect(function (err, client) {
    const db = client.db("locations");

    // Insert a single document
    db.collection("user-locations").insertOne(
      {
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng },
      },
      function (err, r) {
        console.log(r);
        res.json({ message: "Stored Location!", locId: r.insertedId });
      }
    );
  });

  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: { lat: req.body.lat, lng: req.body.lng },
  // });
});

router.get("/location/:lid", (req, res, next) => {
  const locationId = req.params.lid;
  client.connect(function (err, client) {
    const db = client.db("locations");

    // Insert a single document
    db.collection("user-locations").findOne(
      {
        _id: new mongodb.ObjectId(locationId),
      },
      function (err, doc) {
        if (!doc) {
          return res.status(404).json({ message: "Location Not Found!" });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      }
    );
  });
});

module.exports = router;
