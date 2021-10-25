import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ mensaje, iteracion, opacity, fill }) => {
  return (
    <div className={styles.notificacion} style={{ opacity: opacity, animationIterationCount: iteracion, animationFillMode: fill }}>
      {mensaje}
    </div>
  );
};

export default Notification;
