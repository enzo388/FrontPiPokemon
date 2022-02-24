import {GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_ATTACK,
GET_DETAIL, RESET_DETAIL, POST_POKEMON, RELOAD_POKEMONS} from '../actions/names';

const initial_state = {
    pokemons: [],
    all_pokemons: [],
    types: [],
    detail: {}
}; 

function reducer(state = initial_state, action){
 //el swhitch toma la constatante que va a ir cambiando en este caso action.type
 //explicacion del swhich: 
 //si por ejemplo nosotros tenemos una variable y esa variable se llama nombre que se va a ir cambiando
 //algo asi switch(nombre)
// y nosotros queremos generar acciones a partir de ese nombre
// y en el caso de que ese nombre sea 
// case "enzo":
// nosotros retornamos una accion. Ejemplo console.log(Aprobame XD)
// y asi nosotros podemos ir teniendo muchos casos y retornar acciones distintas 
    switch (action.type) {

        case FILTER_BY_ORIGIN:
            let pokemons_filtered_by_origin;
            if(action.payload === "DB"){
                pokemons_filtered_by_origin = state.all_pokemons.filter( poke => poke.hasOwnProperty("create"));
                if(pokemons_filtered_by_origin.length === 0){
                    pokemons_filtered_by_origin = ["No hay pokemon en la db"];
                }
            }else if(action.payload === "API"){
                pokemons_filtered_by_origin = state.all_pokemons.filter( poke => !poke.hasOwnProperty("create"));
            }else{
                pokemons_filtered_by_origin = state.all_pokemons;
            }
            return {
                ...state,
                pokemons: pokemons_filtered_by_origin
            }
        
        case FILTER_BY_TYPE:
            let pokemons_filtered_by_type;
            if(action.payload === "All"){
                pokemons_filtered_by_type = state.all_pokemons;
            }else{
                pokemons_filtered_by_type = state.all_pokemons.filter( poke => poke.types.includes(action.payload));
            }
            if(pokemons_filtered_by_type.length === 0){
                pokemons_filtered_by_type = ["No hay pokemons de ese tipo "];
            }
            return {
                ...state,
                pokemons: pokemons_filtered_by_type
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case GET_POKEMONS:
            return {
                // le digo que copie la informacion de su data del estado inicial 

                ...state,
                //le digo que ese array pokemons va a ser igual a lo que esta en payload
                pokemons: action.payload,
                all_pokemons: action.payload
            }

        case GET_POKEMON_BY_NAME:
            if(action.payload.length === 0) {
                state.pokemons = ["El Pokemon No Existe"]
            }else{
                state.pokemons = action.payload
            }
            return {
                ...state
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case ORDER_BY_ATTACK:
            let pokemons_ordered_by_attack;
            if(action.payload === "ASC"){
                pokemons_ordered_by_attack = state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return 1;
                    if(a.attack < b.attack) return -1;
                    return 0;
                });
            }else if(action.payload === "DESC"){
                pokemons_ordered_by_attack = state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return -1;
                    if(a.attack < b.attack) return 1;
                    return 0;
                });
            }else{
                pokemons_ordered_by_attack = state.all_pokemons
            }
            return {
                ...state,
                pokemons: pokemons_ordered_by_attack
            }
            
        case ORDER_BY_NAME:
            let pokemons_ordered_by_name;
            if(action.payload === "ASC"){
                pokemons_ordered_by_name = state.pokemons.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                });
            }else if(action.payload === "DESC"){
                pokemons_ordered_by_name = state.pokemons.sort((a, b) => {
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                });
            }else{
                pokemons_ordered_by_name = state.all_pokemons
            }
            return {
                ...state,
                pokemons: pokemons_ordered_by_name
            }
        
        case POST_POKEMON:
            
            return {
                ...state
            }

        case RELOAD_POKEMONS:
            return {
                ...state,
                pokemons: state.original_pokemons,
                all_pokemons: state.original_pokemons
            }

        case RESET_DETAIL:
            return {
                ...state,
                detail: {}
            }
            //en caso de que ninguna condicion sea mandada reroena el estado sin cambios
        default:
            return state;
    }
}

export default reducer;