import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {upper_case} from '../../../controllers';
import {get_detail, reset_detail} from '../../../redux/actions';
import PokeDetail from '../../others/PokeDetail';

import styles from './detail.module.css';

function Detail(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(get_detail(props.match.params.id))
    }, [props.match.params.id,dispatch])

    const details = useSelector((state) => state.detail);
    console.log("Types: ", details.types);

    function handle_button_home(e){
        e.preventDefault();
        dispatch(reset_detail());
        history.push('/home');
    }
    return (
        <div className={styles.detail_box}>
            <button className={styles.btn} onClick={handle_button_home} >Volver</button>
            {
                Object.keys(details).length > 0 ? 
                <div className={styles.pokemon_details}>
                    <div >
                        <img src={details.image} alt={"imagen no encotrada"} className={styles.imagen} />
                    </div>
                    <div className={styles.estadisticas}>
                        <li>
                        <PokeDetail name="Id" data={details.id}  />
                        </li>
                        <li><PokeDetail name="Nombre" data={details.name ? upper_case(details.name) : details.name} /></li>
                        <li><PokeDetail name="Tipos" data={details.types ? details.types.map( type => (upper_case(type) + ' • ')) : details.types} /></li>
                        <li><PokeDetail name="Hp" data={details.hp} /></li>
                        <li><PokeDetail name="Ataque" data={details.attack} /></li>
                        <li><PokeDetail name="Defensa" data={details.defense} /></li>
                        <li><PokeDetail name="Velocidad" data={details.speed} /></li>
                        <li><PokeDetail name="Altura" data={details.height} /></li>
                        <li><PokeDetail name="Peso" data={details.weight} /></li>
                    </div>
                </div>
                : <p className={styles.loading} >Banca...</p>
            }
        </div>
    )
}

export default Detail;