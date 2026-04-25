import React, { useState, useEffect } from 'react';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/authors?page=${page}&size=5`)
      .then(res => res.json())
      .then(data => {
        setAuthors(data.content || []);
        setTotalPages(data.totalPages || 0);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Authors {'>'} List</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Books</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={author.id}>
                <td>{page * 5 + index + 1}</td>
                <td>{author.name}</td>
                <td>{author.booksCount}</td>
                <td>
                  <button className="page-btn" style={{padding: '4px 8px', fontSize: '0.8rem'}}>Edit</button>
                </td>
              </tr>
            ))}
            {authors.length === 0 && (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>No authors found</td></tr>
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

export default AuthorList;
