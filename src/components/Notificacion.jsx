import React from 'react';
import styles from './Notificacion.module.css';

const Notificacion = ({mensaje, iteracion, opacity, fill}) => {
    return (
        <div className={styles.notificacion} style={{opacity: opacity, animationIterationCount: iteracion, animationFillMode: fill }} >{mensaje}</div>
    )
};

export default Notificacion;