import React, { useState } from 'react';
import './Card.css';

const Card = ({ title, price, isOpen, toggleOpen, selected }) => {

  return (
    <div className={`card ${isOpen ? 'open' : ''} ${selected ? 'selected' : ''}`} onClick={toggleOpen}>
      <div className="card-title">{title}</div>
      {isOpen && <div className="card-content">{price}</div>}
    </div>
  );
};

export default Card;
