import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewCreate = () => {
  const [content, setContent] = useState('');
  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/books/all`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!content.trim()) newErrors.content = '* Please enter review content';
    if (!bookId) newErrors.bookId = '* Please select book';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, bookId: Number(bookId) })
    })
    .then(res => {
      if (res.ok) {
        navigate('/reviews');
      } else {
        setErrors({ submit: 'Failed to create review' });
      }
    })
    .catch(err => {
      setErrors({ submit: 'Network error' });
      console.error(err);
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reviews {'>'} Create</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Book</label>
            <select 
              className="form-select"
              value={bookId}
              onChange={(e) => {
                setBookId(e.target.value);
                if (errors.bookId) setErrors({...errors, bookId: ''});
              }}
            >
              <option value="">Select a book</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
            {errors.bookId && <span className="error-msg">{errors.bookId}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Review Content</label>
            <textarea 
              className="form-textarea" 
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors({...errors, content: ''});
              }}
              placeholder="Write your review here..."
            />
            {errors.content && <span className="error-msg">{errors.content}</span>}
          </div>
          
          {errors.submit && <span className="error-msg" style={{display:'block', marginBottom:'16px'}}>{errors.submit}</span>}
          <button type="submit" className="btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewCreate;
