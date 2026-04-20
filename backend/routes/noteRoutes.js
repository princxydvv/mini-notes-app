const express = require('express');
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes
} = require('../controllers/noteController');

const router = express.Router();

router.get('/', getNotes);
router.get('/search', searchNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
