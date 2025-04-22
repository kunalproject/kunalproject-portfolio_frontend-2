import { PortfolioContext } from "../../PortfolioContext.js";
import { useContext } from "react";
import React from 'react';
import styles from './Message.module.css';

const Message = () => {
  const { userData } = useContext(PortfolioContext);
  // Format date function
const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    // Convert to IST (UTC+5:30) by subtracting 5 hours and 30 minutes
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istDate = new Date(date.getTime() - istOffset);
    
    const day = istDate.getDate();
    const month = months[istDate.getMonth()];
    const year = istDate.getFullYear();
    const hours = istDate.getHours().toString().padStart(2, '0');
    const minutes = istDate.getMinutes().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (e) {
    return 'Invalid date';
  }
};

  // Safely get messages array
  const messages = userData?.messages ? [...userData.messages].reverse() : [];
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Messages</h2>
      {!userData || messages.length === 0 ? (
        <p className={styles.empty}>No messages to show</p>
      ) : (
        <div className={styles.list}>
          {messages.map((message, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.header}>
                <h3 className={styles.name}>{message.name || 'Anonymous'}</h3>
                <span className={styles.date}>
                  {message.date ? formatDate(message.date) : 'No date'}
                </span>
              </div>
              {message.mail && (
                <a href={`mailto:${message.mail}`} className={styles.email}>
                  {message.mail}
                </a>
              )}
              <p className={styles.content}>{message.msg || 'No message content'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Message;
