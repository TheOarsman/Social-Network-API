const mongoose = require("mongoose");
const { User, Thought, Reaction } = require("../models");
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
    await Reaction.deleteMany({});

    const createdUsers = await User.insertMany(users);

    // Create thoughts and associate them with the respective users
    const thoughtsWithUserIds = thoughts.map((thought) => {
      const user = createdUsers.find(
        (user) => user.username === thought.username
      );
      thought.username = user._id;
      return thought;
    });

    const createdThoughts = await Thought.insertMany(thoughtsWithUserIds);

    // Create reactions and associate them with random users and thoughts
    for (const thought of createdThoughts) {
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      // Create a random number of reactions for each thought
      const numReactions = Math.floor(Math.random() * 5); // Random number between 0 and 4
      for (let i = 0; i < numReactions; i++) {
        await Reaction.create({
          reactionBody: "Some reaction",
          username: randomUser._id,
          thoughtId: thought._id,
        });
      }
    }

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Close the connection after seeding
    mongoose.disconnect();
  }
};

seedDatabase();
