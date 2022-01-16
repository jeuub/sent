module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "**/node_modules/**/*"],
    addTypename: false,
    service: {
      name: "sent",
      localSchemaFile: "./schema.json",
    },
  },
};
