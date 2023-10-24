import React from 'react';
import './style.scss';
import Basic from './Basic';

function Motion() {
  return (
    <div className='motion-page'>
      <Basic />
    </div>
  )
}

Motion.displayName = 'Motion';
export const Component = Motion;