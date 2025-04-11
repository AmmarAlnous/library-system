const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// 🛡️ الحماية:
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// 🟢 جلب كل الكتب (متاح للجميع)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الكتب' });
  }
});

// 🔒 إضافة كتاب (فقط للمشرفين)
router.post('/', verifyToken, checkRole('admin'), async (req, res) => {
  try {
    const { title, author, category, description, thumbnail, pdfUrl, availableCopies } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      description,
      thumbnail,
      pdfUrl,
      availableCopies
    });

    const savedBook = await newBook.save();
    res.status(201).json({ message: '✅ تم إضافة الكتاب بنجاح', book: savedBook });
  } catch (err) {
    res.status(400).json({ error: '❌ فشل في إضافة الكتاب' });
  }
});

// 🔍 البحث في Google Books
const { searchGoogleBooks } = require('../services/googleBooksService');

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ error: 'يرجى كتابة كلمة البحث (query)' });
    }

    const books = await searchGoogleBooks(query);
    res.status(200).json(books);

  } catch (err) {
    console.error('❌ خطأ أثناء جلب نتائج البحث:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب البيانات من Google Books' });
  }
});

module.exports = router;