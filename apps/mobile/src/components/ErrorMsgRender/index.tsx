import React from 'react';
import './index.scss';
import { Message, MultipleFieldErrors } from 'react-hook-form';

interface Props {
  message: Message;
  messages?: MultipleFieldErrors;
}
function ErrorMsgRender({ message, messages }: Props) {
  return <div className="errors">
    {
      Object.entries(messages || { default: message }).map(([type, msg]) => (
        <p key={type} className="error highlight red">{msg}</p>
      ))
    }
  </div>
}

ErrorMsgRender.displayName = 'ErrorMsgRender';
export default ErrorMsgRender;