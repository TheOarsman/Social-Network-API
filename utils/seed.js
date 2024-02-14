const mongoose = require("mongoose");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);

    // Update thoughts to use created user IDs
    const thoughtsWithUserIds = thoughts.map((thought) => ({
      ...thought,
      username: createdUsers.find((user) => user.username === thought.username)
        ._id,
    }));

    await Thought.insertMany(thoughtsWithUserIds);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
};

seedDatabase();
