const fs = require('fs');
const path = require('path'); 
const { getDB } = require('./db');
const { ObjectId } = require('mongodb'); // ObjectId pour la conversion d'ID

// Fonction pour initialiser la base de données avec des données à partir du fichier JSON
async function connectAndInitialize() {
  const db = getDB();

  // Lire et parser le fichier JSON
  const dataPath = path.join(__dirname, '../../../', 'initialData.json');
  const parsedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Supprimer les données existantes
  await db.collection('users').deleteMany({});
  await db.collection('passes').deleteMany({});
  await db.collection('places').deleteMany({});

  // Insérer les passes et récupérer leurs ObjectIds
  const passInsertResult = await db.collection('passes').insertMany(parsedData.passes);
  const passIds = passInsertResult.insertedIds; // Les IDs des passes insérées
  
  // Associer les utilisateurs aux passes en utilisant les ObjectIds
  const users = parsedData.users.map(user => ({
    ...user,
    pass_ids: user.pass_ids.map(id => ObjectId(passIds[id - 1])) // Mapping des pass_ids avec les ObjectId correspondants
  }));

  // Insérer les utilisateurs avec les pass_ids modifiés
  await db.collection('users').insertMany(users);

  // Insérer les lieux (places)
  await db.collection('places').insertMany(parsedData.places);

  console.log('Initial data inserted successfully');
}

module.exports = connectAndInitialize;
