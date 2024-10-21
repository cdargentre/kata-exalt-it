const PassService = require('../../application/services/PassService'); // Import du service

// CRUD pour les passes
const createPass = async (req, res) => {
  try {
    const { level } = req.body;

    // Validation basique des données
    if (!level) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const newPass = await PassService.createPass({ level }, req.db);
    res.status(201).json(newPass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pass', error: error.message });
  }
};

const getPassById = async (req, res) => {
  try {
    const pass = await PassService.getPassById(req.params.id, req.db);
    if (!pass) return res.status(404).json({ message: 'Pass not found' });
    res.status(200).json(pass);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pass', error: error.message });
  }
};

const getAllPasses = async (req, res) => {
  try {
    const passes = await PassService.getAllPasses(req.db);
    res.status(200).json(passes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching passes', error: error.message });
  }
};

const updatePass = async (req, res) => {
  try {
    const result = await PassService.updatePass(req.params.id, req.body, req.db);
    if (result.modifiedCount === 0) return res.status(404).json({ message: 'Pass not found' });
    res.status(200).json({ message: 'Pass updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pass', error: error.message });
  }
};

const deletePass = async (req, res) => {
  try {
    const result = await PassService.deletePass(req.params.id, req.db);
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Pass not found' });
    res.status(204).json({ message: 'Pass deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pass', error: error.message });
  }
};

module.exports = { createPass, getPassById, getAllPasses, updatePass, deletePass };
