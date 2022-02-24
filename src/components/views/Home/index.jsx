import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//use dispatch sirve para consimir la accion
// el use selector va a leer nuestro array de pokemones 
import { useHistory } from 'react-router-dom';

import { get_pokemons } from '../../../redux/actions';
//importo la accion para raer los pokemones 

import Pagination from '../../others/Pagination';
import Pokemon from '../../others/Pokemon';
import SearchBar from '../../others/SearchBar';
import Filter from '../../others/Filter';
import Order from '../../others/Order';

import styles from './home.module.css';

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [, set_orden] = useState('');

    useEffect(() => {
        dispatch(get_pokemons());
    }, [dispatch]);

    const pokemons = useSelector(state => state.pokemons);
    //useSelector va a devolver nuestro state que es un array con pokemones
    const pokemons_por_página = 9;
    const [página_actual, set_página_actual] = useState(1);
    const índice_del_último_pokemon = página_actual * pokemons_por_página;
    const índice_del_primer_pokemon = índice_del_último_pokemon - pokemons_por_página;
    const pokemons_actuales = pokemons.slice(índice_del_primer_pokemon, índice_del_último_pokemon);
    console.log(pokemons)
    function paginate(page_number) {
        set_página_actual(page_number);
        
    }

    function handle_click(e) {
        e.preventDefault();
        dispatch(get_pokemons());
    }

    function create_pokemon_btn(e) {
        e.preventDefault();
        history.push('/create');
    }

    return (

        <div className={styles.home_box}>


            <div className={styles.btns_box}>
                <button className={styles.btn} onClick={handle_click} >Inicio</button>
                <SearchBar />
                <button className={styles.btn} onClick={create_pokemon_btn} >Crea Tu Pokemon</button>
            </div>

            <div className={styles.btns_box}>
                <Order set_page={set_página_actual} page={página_actual} render={set_orden} />
                <Filter />
            </div>

            <div className={styles.pokemons_box}>
                {
                    pokemons.length !== 0 ? pokemons_actuales.map(poke => (
                        typeof poke === 'object' ? <Pokemon id={poke.id} name={poke.name} image={poke.image} types={poke.types} key={poke.id} />
                            : <h3 >{poke}</h3>
                    ))
                        : <h3 className={styles.loading} > Banca...</h3>
                }
            </div>
            <div className={styles.btns_box}>
                {
                    pokemons.length > pokemons_por_página ? <Pagination pokemons_per_page={pokemons_por_página} total_pokemons={pokemons.length} paginate={paginate} />
                        : <br></br>
                }
            </div>
            

        </div>
    )
}

export default Home;