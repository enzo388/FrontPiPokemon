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
            
            
                <button onClick={handle_home} className={styles.landing_btn3} >Inicio</button>
    
        </div>
    )
}

export default Landing;