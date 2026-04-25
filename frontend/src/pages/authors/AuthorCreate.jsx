import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorCreate = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('* Please enter name');
      return;
    }
    
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/authors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(res => {
      if (res.ok) {
        navigate('/authors');
      } else {
        setError('Failed to create author');
      }
    })
    .catch(err => {
      setError('Network error');
      console.error(err);
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Authors {'>'} Create</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter author name"
            />
            {error && <span className="error-msg">{error}</span>}
          </div>
          
          <button type="submit" className="btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default AuthorCreate;
