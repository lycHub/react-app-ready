import React from 'react'
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className='app-header'>
      <nav className='h-full'>
        <p><Link to="/home">Home</Link></p>
        <p><Link to="/posts">Posts</Link></p>
      </nav>
    </header>
  )
}

AppHeader.displayName = 'AppHeader';
export default AppHeader;