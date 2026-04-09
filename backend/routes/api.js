const express = require('express');
const router = express.Router();
const { File, Client, Review, Homepage, Query } = require('../models');

// ==== FILES ====
router.get('/files', async (req, res) => {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/files', async (req, res) => {
  try {
    const newFile = new File(req.body);
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/files/:id', async (req, res) => {
  try {
    const updated = await File.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/files/:id', async (req, res) => {
  try {
    await File.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==== CLIENTS ====
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clients/:id', async (req, res) => {
  try {
    await Client.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/clients/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await Client.findOne({ username, password });
    if (client) {
      res.json({ success: true, client });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==== REVIEWS ====
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/reviews', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/reviews/:id', async (req, res) => {
  try {
    const updated = await Review.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/reviews/:id', async (req, res) => {
  try {
    await Review.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==== HOMEPAGE CONFIG ====
router.get('/homepage', async (req, res) => {
  try {
    let config = await Homepage.findOne({});
    if (!config) {
      config = new Homepage({});
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/homepage', async (req, res) => {
  try {
    let config = await Homepage.findOne({});
    if (!config) {
      config = new Homepage(req.body);
      await config.save();
    } else {
      config = await Homepage.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==== QUERIES ====
router.post('/queries', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    await newQuery.save();
    res.status(201).json({ success: true, newQuery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
