const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    var camp = new Campground({
      author: "64da923add8f133aa3bb67d5",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dxk1akbrt/image/upload/v1692296424/Miro/l63gsezwkxs4tx9usjkc.jpg",
          filename: "Miro/l63gsezwkxs4tx9usjkc",
        },
        {
          url: "https://res.cloudinary.com/dxk1akbrt/image/upload/v1692296425/Miro/kh6yo7j3dun06mulya2y.jpg",
          filename: "Miro/kh6yo7j3dun06mulya2y",
        },
      ],

      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, officia delectus reprehenderit corporis sunt placeat debitis, non provident reiciendis consequatur eius quos itaque sint blanditiis necessitatibus fugit harum quasi repellendus.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
