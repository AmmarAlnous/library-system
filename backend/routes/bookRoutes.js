const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// ✅ جلب كل الكتب
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الكتب' });
  }
});

// ✅ إضافة كتاب جديد
router.post('/', async (req, res) => {
  try {
    const { title, author, category, description, availableCopies } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      description,
      availableCopies
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: 'فشل في إضافة الكتاب' });
  }
});

module.exports = router;
// نستدعي دالة البحث من الخدمة
const { searchGoogleBooks } = require('../services/googleBooksService');

/*
  هذا المسار يسمح بالبحث عن كتب من Google Books API
  مثال الاستخدام:
  GET /api/books/search?query=javascript
*/
router.get('/search', async (req, res) => {
  try {
    // نأخذ الكلمة المفتاحية من الرابط (من query string)
    const query = req.query.query;

    // إذا ما في كلمة بحث، نرجع خطأ
    if (!query) {
      return res.status(400).json({ error: 'يرجى كتابة كلمة البحث (query)' });
    }

    // نستخدم الدالة التي كتبناها للبحث في Google Books
    const books = await searchGoogleBooks(query);

    // نرجع النتائج للمستخدم
    res.status(200).json(books);

  } catch (err) {
    console.error('❌ خطأ أثناء جلب نتائج البحث:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب البيانات من Google Books' });
  }
});
