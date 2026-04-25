import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/books?page=${page}&size=5`)
      .then(res => res.json())
      .then(data => {
        setBooks(data.content || []);
        setTotalPages(data.totalPages || 0);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Books {'>'} List</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{page * 5 + index + 1}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>
                  <button className="page-btn" style={{padding: '4px 8px', fontSize: '0.8rem'}}>Edit</button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>No books found</td></tr>
            )}
          </tbody>
        </table>
        
        {totalPages > 0 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx} 
                className={`page-btn ${page === idx ? 'active' : ''}`}
                onClick={() => setPage(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
