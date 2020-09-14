module.exports = {
  entry: {
    main: {
      import: "./app/index.js",
      dependOn: "common",
    },
    main2: {
      import: "./app/index2.js",
      dependOn: "common",
    },
    common: "./app/msgCommon.js",
  },
};
