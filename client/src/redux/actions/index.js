import axios from 'axios'

//getCountries hace un get a la base de datos sin ningun argumento
export const getCountries = () =>{
    return async (dispatch) => {
    const results = await axios.get("/countries");
    return dispatch({type: 'GET_COUNTRY', payload: results.data});  
    }
}

//filterFuntion es una accion que recibe como argumento un arreglo filtrado y modifica el estado de 'countries'
export const filterAction = (filtered) =>{
    return {type: 'FILTER_COUNTRY', payload: filtered}
}
//search se encarga de buscar el pais por el nombre
export const search = (name) => {
    return async (dispatch) => {
        if(name.length > 0){
            const result = await axios.get(`/countries?name=${name}`);
            return dispatch({type: 'BUSCAR_COUNTRY', payload: result.data})
        }else{
            return dispatch({type:'BUSCAR_COUNTRY', payload:[]})
        }
    }
}
//prioridad sirve de pivot para que Countries sepa que renderizar, si los filtros o lo que se esta buscando
export const prioridad = (payload) =>{
    return {type: 'PRIORIDAD', payload}
} 

// get activity trae todas las actividades filtradas por nombre
export const getActivity = () =>{
        return async (dispatch) => {
            const result = await axios.get(`/activities/`)
            return dispatch({type:"BUSCAR_ACTIVIDAD", payload: result.data})
        }
    }

//sort ordena los paises, en los componentes se utiliza para ordenar tantpo por nombre como por poblacion
export const sort = (funcion) =>{
    return {type: "ORDENAR", payload: funcion}
}
//addActivity rebibe un objeto, con el nombre y la bandera del pais a la que se le quiere agregar una actividad
export const addActivity = (obj) =>{
    return {type: "ADD", payload: obj}
}
//removeActivity remueve uno de los paises seleccionados con el addActivity (antes del posteo)
export const removeCountryFromActivity = (array) => {
    return {type: "REMOVE", payload: array}
}

export const postActivity = (obj) => {
    return async (dispatch) =>{
        const result = await axios.post('/activities', obj);
        dispatch({type: 'POST', payload: result.data})
        return result
    }
}
export const deleteActivity = (id) => {
    return async (dispatch) => {
        const result = await axios.delete(`/activities/${id}`);
        return dispatch({type: 'DELETE', payload: result.data});
    }
}
export const forcePage = (page) => {
    return {type: 'FORCE', payload:page}
}

export const orden = (string) => {
    return{ type: "ORDEN", payload: string}
}

export const firstFilter = ( array ) => {
    return {type: 'FIRST_FILTER', payload: array}
}

export const addFilter = ( array ) => {
    return {type: 'ADD_FILTER', payload: array}
}

export const removeFilter = (array) => {
    return {type: 'REMOVE_FILTER', payload: array}
}

export const clean = () =>{
    return {type: 'CLEAN'}
}

export const getActivityId = (id) =>{
    return async (dispatch) => {
        const result = await axios.get(`/activities/${id}`)
        return dispatch({type:"BUSCAR_ACTIVIDAD_BY_ID", payload: result.data})
    }
}