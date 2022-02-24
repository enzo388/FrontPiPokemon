import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './landing.module.css';

function Landing() {
    const history = useHistory();

    function handle_home(e) {
        e.preventDefault();
        history.push("/home");
    }
    return (
        <div className={styles.landing_box}>
            <div className={styles.landing_title}>
                <label>Buscador Pokemon</label>
            </div>
            <div className={styles.landing_btn1}>
                <button onClick={handle_home} className={styles.landing_btn3} >Inicio</button>
            </div>
        </div>
    )
}

export default Landing;