const initialState = {
    countries: [],
    filtered:[],
    prioridad: '',
    orden: '',
    addCountry:[],
    post: '',
    page: 1,
    actividad: [],
    detail: [], 
    pivot: 0
}


export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRY':  return {...state, countries: action.payload, filtered: action.payload, pivot: 0 };
        case 'FILTER_COUNTRY': return {...state, filtered: action.payload, pivot: 0};
        case 'BUSCAR_COUNTRY': return {...state, filtered: action.payload, pivot: 0 };
        case 'PRIORIDAD': return {...state, prioridad: action.payload, pivot: 0};
        case 'BUSCAR_ACTIVIDAD': return {...state, actividad: action.payload, pivot: 0};
        case 'ORDENAR': return {...state, countries: state.countries.sort(action.payload), filtered: state.filtered.sort(action.payload) };
        case 'ADD': return {...state, addCountry: [...state.addCountry, action.payload]};
        case 'REMOVE': return {...state, addCountry: action.payload};
        case 'POST': return {...state, post: action.payload };
        case 'FORCE': return {...state, page: action.payload};
        case 'ORDEN': return {...state, orden: action.payload};
        case 'FIRST_FILTER': return {...state, filtered: action.payload, pivot: 1};
        case 'ADD_FILTER': return {...state, filtered: state.filtered.concat(action.payload)}
        case 'REMOVE_FILTER': return{...state, filtered: action.payload};
        case 'CLEAN': return{ ...state, addCountry: [], post: '', actividad: []};
        case 'DELETE': return {...state, post: action.payload }
        case 'BUSCAR_ACTIVIDAD_BY_ID': return {...state, detail: action.payload }
        default: return state
    }
}