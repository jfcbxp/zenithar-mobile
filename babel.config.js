module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
    ],
    plugins: 
    [
      'inline-dotenv',
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    ],
  };
};
