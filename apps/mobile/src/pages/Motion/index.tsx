import React from 'react';
import './style.scss';
import Basic from './Basic';
import { motion } from 'framer-motion';

function Motion() {
  return (
    <motion.div
      className='motion-page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    // style={{ originX: isPresent ? 0 : 1 }}
    >
      <Basic />
    </motion.div>
  )
}

Motion.displayName = 'Motion';
export const Component = Motion;