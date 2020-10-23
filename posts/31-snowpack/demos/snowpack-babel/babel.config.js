module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
        // useBuiltIns: "usage",
        // corejs: 3,
        modules: false,
      },
    ],
  ],
};
