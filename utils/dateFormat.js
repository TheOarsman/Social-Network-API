// Import the day.js library
const dayjs = require("dayjs");

// Function to format a date using day.js
const formatDate = (date, format = "YYYY-MM-DD") => {
  return dayjs(date).format(format);
};

// Export the formatDate function for use in other parts of your application
module.exports = formatDate;
