const router = require("express").Router();
const userRoutes = require("./user");
const thoughtRoutes = require("./thoughts");

// Define routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
