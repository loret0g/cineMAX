import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>I think you are lost</h1>
      <div className="iframe-container">
        <iframe src="https://giphy.com/embed/7GSKdxUGetthS" id="img-not-found" frameBorder="0" allowFullScreen></iframe>
      </div>
      
      <Link to="/">
        <Button variant="warning">Go Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
