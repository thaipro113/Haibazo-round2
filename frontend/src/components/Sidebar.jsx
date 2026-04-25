import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [expanded, setExpanded] = useState({
    authors: true,
    books: true,
    reviews: true
  });

  const toggleExpand = (menu) => {
    setExpanded(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        HAIBAZO BOOK REVIEW
      </div>
      <ul className="sidebar-menu">
        <li className={`sidebar-item ${expanded.authors ? 'expanded' : ''}`}>
          <div className="sidebar-link" style={{cursor: 'pointer'}} onClick={() => toggleExpand('authors')}>
            <div className="menu-header">
              <div className="menu-icon-title">
                <span style={{backgroundColor: '#eab308', width: '16px', height: '16px', display: 'inline-block'}}></span>
                Authors
              </div>
              <span>{expanded.authors ? 'v' : '^'}</span>
            </div>
          </div>
          <ul className="sidebar-sub-menu">
            <li><NavLink to="/authors" className="sidebar-sub-link">List</NavLink></li>
            <li><NavLink to="/authors/create" className="sidebar-sub-link">Create</NavLink></li>
          </ul>
        </li>

        <li className={`sidebar-item ${expanded.books ? 'expanded' : ''}`}>
          <div className="sidebar-link" style={{cursor: 'pointer'}} onClick={() => toggleExpand('books')}>
            <div className="menu-header">
              <div className="menu-icon-title">
                <span style={{backgroundColor: '#eab308', width: '16px', height: '16px', display: 'inline-block'}}></span>
                Books
              </div>
              <span>{expanded.books ? 'v' : '^'}</span>
            </div>
          </div>
          <ul className="sidebar-sub-menu">
            <li><NavLink to="/books" className="sidebar-sub-link">List</NavLink></li>
            <li><NavLink to="/books/create" className="sidebar-sub-link">Create</NavLink></li>
          </ul>
        </li>

        <li className={`sidebar-item ${expanded.reviews ? 'expanded' : ''}`}>
          <div className="sidebar-link" style={{cursor: 'pointer'}} onClick={() => toggleExpand('reviews')}>
            <div className="menu-header">
              <div className="menu-icon-title">
                <span style={{backgroundColor: '#eab308', width: '16px', height: '16px', display: 'inline-block'}}></span>
                Reviews
              </div>
              <span>{expanded.reviews ? 'v' : '^'}</span>
            </div>
          </div>
          <ul className="sidebar-sub-menu">
            <li><NavLink to="/reviews" className="sidebar-sub-link">List</NavLink></li>
            <li><NavLink to="/reviews/create" className="sidebar-sub-link">Create</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
