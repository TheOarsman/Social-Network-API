const connection = require("../config/connection");
const { user, thought, reaction } = require("../models");
const { users, thoughts, reactions } = require("./data");

connection.on("error", (err) => err);

const seedDatabase = async () => {
  console.log("seeding database");
  try {
    console.log("deleting users & thoughts, and reactions");
    await user.deleteMany({});
    console.log("User Deleted");
    await thought.deleteMany({});
    console.log("Thoughts Deleted");
    await reaction.deleteMany({});
    console.log("Reactions Deleted");
    console.log("insert users, thoughts, and reactions");

    const createdUsers = await user.insertMany(users);
    console.log("new user created", createdUsers);
    const createdThoughts = await thought.insertMany(thoughts);
    console.log("new thoughts created", createdThoughts);

    // Iterate over each thought and associate reactions
    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const reactionsForThought = reactions.map((reaction) => ({
        ...reaction,
        thoughts: thought._id,
      }));
      await reaction.insertMany(reactionsForThought);
    }

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
