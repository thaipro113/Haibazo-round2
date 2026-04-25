import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookCreate = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/authors/all`)
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = '* Please enter title';
    if (!authorId) newErrors.authorId = '* Please select author';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, authorId: Number(authorId) })
    })
    .then(res => {
      if (res.ok) {
        navigate('/books');
      } else {
        setErrors({ submit: 'Failed to create book' });
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
        <h1 className="page-title">Books {'>'} Create</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({...errors, title: ''});
              }}
              placeholder="Enter book title"
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>
            <select 
              className="form-select"
              value={authorId}
              onChange={(e) => {
                setAuthorId(e.target.value);
                if (errors.authorId) setErrors({...errors, authorId: ''});
              }}
            >
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
            {errors.authorId && <span className="error-msg">{errors.authorId}</span>}
          </div>
          
          {errors.submit && <span className="error-msg" style={{display:'block', marginBottom:'16px'}}>{errors.submit}</span>}
          <button type="submit" className="btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default BookCreate;
