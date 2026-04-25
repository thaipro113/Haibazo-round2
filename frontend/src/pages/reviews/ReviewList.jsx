import { useState, useEffect } from 'react';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/reviews?page=${page}&size=5`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.content || []);
        setTotalPages(data.totalPages || 0);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reviews {'>'} List</h1>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Book</th>
              <th>Author</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{page * 5 + index + 1}</td>
                <td>{review.bookTitle}</td>
                <td>{review.authorName}</td>
                <td>{review.content}</td>
                <td>
                  <button className="page-btn" style={{padding: '4px 8px', fontSize: '0.8rem'}}>Edit</button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr><td colSpan="5" style={{textAlign: 'center'}}>No reviews found</td></tr>
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

export default ReviewList;
