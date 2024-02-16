const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { users, thoughts, reaction } = require("./data");

connection.on("error", (err) => err);

const seedDatabase = async () => {
  console.log("seeding database");
  try {
    console.log("deleting users & thoughts, and reactions");
    const res = await User.deleteMany({});
    console.log("User Deleted", res);
    const res2 = await Thought.deleteMany({});
    console.log("Thoughts Deleted", res2);
    // await Reaction.deleteMany({});
    console.log("insert users & thoughts");

    const createdUsers = await User.insertMany(users);
    console.log("new user created", createdUsers);
    const createdThoughts = await Thought.insertMany(thoughts);
    console.log("new thoughts created", createdThoughts);
    // const createdReaction = await Reaction.insertMany(reaction);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

connection.once("open", async () => {
  console.log("connected");

  await seedDatabase();

  process.exit(0);
});
