import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div style={{ textAlign: 'center', backgroundColor: '#0D1117', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: '#FF0000', marginBottom: '16px', fontSize: '6rem', fontWeight: 'bold' }}>404</h1>
      <p style={{ marginBottom: '16px', fontSize: '1.125rem', color: '#C9D1D9' }}>Oops! Looks like you're lost.</p>
      <div style={{ marginBottom: '16px', animation: 'bounce 1s infinite' }}>
        <svg style={{ height: '64px', width: '64px', color: '#FF6347' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </div>
      <p style={{ marginTop: '16px', color: '#6E7E91' }}>Let's get you back <Link to="/admin" style={{ color: '#00A8FF' }}>home</Link>.</p>
    </div>
  );
}
