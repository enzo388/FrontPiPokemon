import React from 'react';
import {useDispatch} from 'react-redux';
import {order_pokemons_by_name, order_pokemons_by_attack} from '../../../redux/actions';

import styles from './order.module.css';

function Order({set_page, page, render}) {
    const dispatch = useDispatch();

    function handle_order_name(e){
        e.preventDefault();
        dispatch(order_pokemons_by_name(e.target.value));
        if(page === 1){
            render(`Ordenar Alfabeticamente ${e.target.value}`);
        }else{
            set_page(1);
        }
    }

    function handle_order_attack(e){
        e.preventDefault();
        dispatch(order_pokemons_by_attack(e.target.value));
        if(page === 1){
            render(`Ordenar por ataque ${e.target.value}`);
        }else{
            set_page(1);
        }
    }
    return (
        <div >
            <div>
                <label  >Ordenar Alfabeticamente </label>
                <select className={styles.name_select} onChange={handle_order_name} >
                    <option value="" ></option>
                    <option value="ASC" >A-Z</option>
                    <option value="DESC" >Z-A</option>
                </select>
            </div>
            <div>
                <label  >Ordenar Por Ataque</label>
                <select className={styles.attack_select} onChange={handle_order_attack}>
                    <option value="" ></option>
                    <option value="ASC" >Asc</option>
                    <option value="DESC" >Desc</option>
                </select>
            </div>
        </div>
    )
}

export default Order;