// components/Card.tsx
'use client';
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
      <style jsx>{`
        .card {
          color: black
          border: 1px solid #eaeaea;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 1 10px 10px rgba(0,0,0,0.05);
          max-width: 1500px;
          margin: 32px auto;
          background: #fff;
          font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align:'center';
        }
        .card-body {
          padding: 24px;
        }
        .card-title {
          margin: 0 0 16px 0;
          font-size: 1.5rem;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Card;