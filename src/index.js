const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require("./connector");
const cors = require("cors");
app.use(cors());
const Joi = require("joi");
const schema = Joi.object().keys({
  movie: Joi.string().required(),
  seats: Joi.object().keys({
    A1: Joi.number().required(),
    A2: Joi.number().required(),
    A3: Joi.number().required(),
    A4: Joi.number().required(),
    D1: Joi.number().required(),
    D2: Joi.number().required(),
  }),
  slot: Joi.string().required(),
});

app.get("/api/booking", async (req, res) => {
  try {
    const lastBooking = await connection.find().sort({ _id: -1 }).limit(1);
    if (lastBooking.length === 0) return res.json({ message: "no previous booking found" });
    const { movie, seats, slot } = lastBooking[0];
    return res.json({ movie: movie, seats: seats, slot: slot });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.post("/api/booking", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.message);
  const { movie, seats, slot } = req.body;
  const bookingDetails = new connection({ movie, seats, slot });
  try {
    const savedBookingDetails = await bookingDetails.save();
    lastBooking = req.body;
    return res.status(200).json(savedBookingDetails._id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
