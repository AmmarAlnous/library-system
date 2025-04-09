const axios = require('axios');

const searchGoogleBooks = async (query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        maxResults: 10
      }
    });

    const books = response.data.items.map(item => {
      const info = item.volumeInfo;
      return {
        title: info.title,
        author: info.authors ? info.authors.join(', ') : 'Unknown',
        description: info.description || '',
        thumbnail: info.imageLinks?.thumbnail || '',
        publishedDate: info.publishedDate || 'N/A',
        categories: info.categories || ['Uncategorized']
      };
    });

    return books;
  } catch (error) {
    console.error('❌ Error fetching books from Google:', error.message);
    return [];
  }
};

module.exports = { searchGoogleBooks };
