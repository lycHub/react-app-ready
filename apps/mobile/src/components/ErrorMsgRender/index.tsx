import React from 'react';
import './index.scss';
import { Message, MultipleFieldErrors } from 'react-hook-form';
import { motion } from "framer-motion";

interface Props {
  message: Message;
  messages?: MultipleFieldErrors;
}
function ErrorMsgRender({ message, messages }: Props) {
  return <motion.div
    className="errors"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
    {
      Object.entries(messages || { default: message }).map(([type, msg]) => (
        <p key={type} className="error highlight red">{msg}</p>
      ))
    }
  </motion.div>

}

ErrorMsgRender.displayName = 'ErrorMsgRender';
export default ErrorMsgRender;