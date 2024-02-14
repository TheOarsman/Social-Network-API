const router = require("express").Router();
const userRoutes = require("./api/user");
const thoughtRoutes = require("./api/thoughts");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
