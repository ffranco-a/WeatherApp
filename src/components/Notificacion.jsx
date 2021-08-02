import React from 'react';
import styles from './Notificacion.module.css';

const Notificacion = ({mensaje}) => {
    return (
        <div className={styles.notificacion}>{mensaje}</div>
    )
};

export default Notificacion;