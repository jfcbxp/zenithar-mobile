module.exports = () => {
  if (process.env.EXPO_ENV === "production") {
    return require("./app.production.json");
  } else {
    return require("./app.development.json");
  }
};