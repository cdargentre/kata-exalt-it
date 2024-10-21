const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';;
const dbName = 'kata_cdargentre';

let db;

async function connectDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
}

function getDB() {
  return db;
}
console.log('connectDB function:', connectDB);
module.exports = { connectDB, getDB };
