const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  fileUrl: { type: String, required: true }, // Base64 string
  fileType: { type: String },
  uploadDate: { type: String },
  isPublic: { type: Boolean, default: false },
  assignedTo: { type: String } // Client id
});

const ClientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  projectName: { type: String }
});

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String },
  approved: { type: Boolean, default: false }
});

const HomepageSchema = new mongoose.Schema({
  hero: { type: Boolean, default: true },
  overview: { type: Boolean, default: true },
  services: { type: Boolean, default: true },
  projects: { type: Boolean, default: true },
  reviews: { type: Boolean, default: true },
  contact: { type: Boolean, default: true }
});

const QuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Use FileRecord (not "File") so routes never call `new File(...)` — Node 18+ exposes a global Web API `File`.
const FileRecord = mongoose.model('File', FileSchema);

module.exports = {
  FileRecord,
  Client: mongoose.model('Client', ClientSchema),
  Review: mongoose.model('Review', ReviewSchema),
  Homepage: mongoose.model('Homepage', HomepageSchema),
  Query: mongoose.model('Query', QuerySchema)
};
