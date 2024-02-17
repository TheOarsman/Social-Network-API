const { connect, connection } = require("mongoose");

const connectionString = "mongodb://localhost:27017/social-network-api";

connect(connectionString);

module.exports = connection;
