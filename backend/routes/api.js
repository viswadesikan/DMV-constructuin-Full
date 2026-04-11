const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { FileRecord, Client, Review, Homepage, Query } = require('../models');

// ==== HEALTH (Mongo connectivity) ====
router.get('/health', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    ok: ready,
    mongo: ready ? 'connected' : 'disconnected',
    readyState: mongoose.connection.readyState,
  });
});

// ==== FILES ====
router.get('/files', async (req, res) => {
  try {
    const files = await FileRecord.find({});
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/files', async (req, res, next) => {
  try {
    const b = req.body;
    if (!b || typeof b !== 'object') {
      return res.status(400).json({ error: 'Missing JSON body' });
    }
    if (typeof b.fileUrl !== 'string' || b.fileUrl.length === 0) {
      return res.status(400).json({ error: 'fileUrl is required' });
    }
    // BSON document limit is 16MB; base64 inflates size — reject early with a clear message.
    const maxChars = 14 * 1024 * 1024;
    if (b.fileUrl.length > maxChars) {
      return res.status(413).json({
        error: `File is too large to store (${Math.round(b.fileUrl.length / 1024 / 1024)}MB raw). MongoDB limit is 16MB per document; use a smaller or more compressed file.`,
      });
    }
    const doc = new FileRecord({
      id: String(b.id),
      name: (typeof b.name === 'string' && b.name.trim()) || 'Untitled',
      category: typeof b.category === 'string' ? b.category : String(b.category ?? ''),
      subcategory: b.subcategory != null ? String(b.subcategory) : '',
      fileUrl: b.fileUrl,
      fileType: b.fileType != null ? String(b.fileType) : undefined,
      uploadDate: b.uploadDate != null ? String(b.uploadDate) : undefined,
      isPublic: Boolean(b.isPublic),
      assignedTo: b.assignedTo != null && b.assignedTo !== '' ? String(b.assignedTo) : undefined,
    });
    const saved = await doc.save();
    res.status(201).json(saved.toObject({ versionKey: false }));
  } catch (error) {
    next(error);
  }
});

router.put('/files/:id', async (req, res) => {
  try {
    const updated = await FileRecord.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/files/:id', async (req, res) => {
  try {
    await FileRecord.findOneAndDelete({ id: req.params.id });
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
