const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _dbConnection;

module.exports = {
  connectToServer: async (callback) => {
    await client
      .connect()
      .then(() => {
        console.log("Successfully connected to MongoDB");
      })
      .catch((err) => {
        console.error("Database err: " + err);
        callback(err);
      });
    // List all databases in the connected cluster.
    // const databases = await client.db().admin().listDatabases();
    // databases.databases.forEach((db) => console.log({ db }));

    _dbConnection = client.db("taventures");
    return _dbConnection;
  },

  getDb: () => _dbConnection,
};
