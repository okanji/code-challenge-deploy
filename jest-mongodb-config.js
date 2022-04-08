module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      // dbName: "jest",
    },
    replSet: {
      count: 3,
      storageEngine: "wiredTiger",
    },
  },
};
