import React from 'react';
import './style.scss';
// import Basic from './Basic';
import Multiple from './Multiple';

function Forms() {
  return (
    <div className='forms-page'>
      {/* <Basic /> */}
      <Multiple />
    </div>
  )
}

Forms.displayName = 'Forms';
export const Component = Forms;