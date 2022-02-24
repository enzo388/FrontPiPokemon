import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {get_types, post_pokemon, get_pokemons} from '../../../redux/actions';
import FormCamp from '../../others/FormCamp';
import {upper_case} from '../../../controllers';


import styles from './create.module.css';







function Create() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, set_input] = useState({
        name: "",
        height: 0,
        weight: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        image: "",
        types: []
    });
    const [errors, set_errors] = useState({});

    const types = useSelector((state) => state.types);
    const pokemons = useSelector((state) => state.all_pokemons);
    console.log(pokemons)
    useEffect(() => {
        if(types.length === 0) dispatch(get_types());
        
    },[types.length,dispatch]);
    useEffect(() => {
        if(pokemons.length === 0) dispatch(get_pokemons());
        
    },[pokemons.length,dispatch]);
    
    //me traigo solo el nombre de el include
    const nombres = pokemons.map( x => x.name)

    
    console.log(nombres)
    

    function handle_button_home(e){
        e.preventDefault();
        history.push('/home');
    }

    function handle_input_change(e){
        e.preventDefault();
        set_input({
            ...input,
            [e.target.name]: e.target.value
        });
        set_errors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handle_select(e){
        e.preventDefault();
        if(e.target.value !== ""){
            let input_aux = input;
            console.log("input_aux: ", input_aux);
            input_aux.types.push(e.target.value)
            set_input({
                ...input,
                types: input_aux.types
            });
        set_errors(validate(input_aux));
        }
    }

    function handle_type_btn(e){
        e.preventDefault();
        set_input({
            ...input,
            types: input.types.filter(type => type !== e.target.value)
        });
    }

    function handle_submit(e){
        e.preventDefault(e);
        if(Object.keys(errors).length !== 0){
            for (const error in errors) {
                alert(errors[error]);
            }
        }else if(input.name.length === 0 || input.types.length === 0){
            alert("Te falta el nombre o el tipo compa.. ")

        }else if(input.name.length > 0 ){
            let n_Imput = input.name.toLocaleLowerCase()
            let resultado = nombres.includes(n_Imput)
            console.log(resultado)
            if(resultado){
                alert("Ese Nombre Ya esta En uso")
                set_input({
                    name: "",
                    height: 0,
                    weight: 0,
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    speed: 0,
                    image: "",
                    types: []
                })
            }else{
                dispatch(post_pokemon(input));
                
                alert("!Pokemon Creado Exitosamente (︡¬ ͜ʖ¬︠) ");
                set_input({
                    name: "",
                    height: 0,
                    weight: 0,
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    speed: 0,
                    image: "",
                    types: []
                })
            }
        }
        
    }

    function validate(input){
        const errors = {};
        
      
        if(!input.name){
            errors.name = "Nombre requerido";
        }
        if(input.hp < 0){
            errors.hp = "Hp No puede ser negativo";
        }
        if(input.attack < 0){
            errors.attack = "Attack No puede ser negativo";
        }
        if(input.defense < 0){
            errors.defense = "Defense No puede ser negativo";
        }
        if(input.speed < 0){
            errors.speed = "Speed No puede ser negativo";
        }
        if(input.height < 0){
            errors.height = "Height No puede ser negativo";
        }
        if(input.weight < 0){
            errors.weight = "Weight No puede ser negativo";
        }
        if(input.types.length === 0){
            errors.types = "Types  requerido ";
        }
        return errors;
    }


    return (
        <div className={styles.create_box}>
            <button className={styles.btn} onClick={handle_button_home} >Volver</button>
            <form className={styles.form}>
                <FormCamp name="Name" type="text" value={input.name}   handle_function={handle_input_change} error_control={errors}  />
                <div>
                    <label className={styles.label} >Types: </label>
                    <select className={styles.type_select} onChange={handle_select} >
                        <option></option>
                        {
                            types.map( type => (
                                <option value={type} key={type} >{upper_case(type)}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    {
                        errors.types && (
                            <p className={styles.error} >{errors.types}</p>
                        )
                    }
                    {
                        input.types.map( type => (
                            <button onClick={handle_type_btn} className={styles.type_btn} value={type} key={type} >{upper_case(type)}</button>
                        ))
                    }
                </div>
                <FormCamp name="Image" type="url" value={input.image}  handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Hp" type="number" value={input.hp}  handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Attack" type="number" value={input.attack}  handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Defense" type="number" value={input.defense}  handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Speed" type="number" value={input.speed}  handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Height" type="number" value={input.height}  handle_function={handle_input_change} error_control={errors} />
                <FormCamp name="Weight" type="number" value={input.weight}  handle_function={handle_input_change} error_control={errors} />
                <button className={styles.submit_btn} type="submit" onClick={handle_submit} >Crear Pokemon</button>
            </form>
        </div>
    )
}

///////////////////////////////////////////////////


export default Create;