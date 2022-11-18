export const az = (a, b) =>{
    if ( a.traduccion.toLowerCase() < b.traduccion.toLowerCase()) return -1;
    if ( a.traduccion.toLowerCase() > b.traduccion.toLowerCase()) return 1;
    return 0
}
export const za = (a, b) =>{
    if ( a.traduccion.toLowerCase() < b.traduccion.toLowerCase()) return 1;
    if ( a.traduccion.toLowerCase() > b.traduccion.toLowerCase()) return -1;
    return 0
}
export const populationAsc = (a, b) =>{
    if ( a.population < b.population) return -1;
    if ( a.population> b.population) return 1;
    return 0
}
export const populationDes = (a, b) =>{
    if ( a.population < b.population) return 1;
    if ( a.population > b.population) return -1;
    return 0
}

export function validateDuracion(input) {
    let error = {};
        if(input.duracion === "min" && input.min !== ''){
            if(input.min > 60 ){
                error.min = "Si la duracion es mayor de 60 minutos, elija la opcion de 'Horas'"
            }else if( input.min < 0){
                error.min = "No se perminten numeros negativos"
            }
        }else if (input.duracion === "hs"){
            if(input.hs !== ''){
                if(input.hs > 24){
                error.hs = "Si la duracion es mayor de 24hs, elija la opcion 'Dias'"
                }else if(input.hs < 1){
                error.hs = "Si la duracion es menor de una hora, elija la opcion 'Minutos'"
                }else if(input.min > 60 ){
                    error.min = "No puede ser mayor a 60 min."
                }else if( input.min < 0){
                    error.min = "No se perminten numeros negativos"
                }
            }else if(input.min > 60 ){
                error.min = "No puede ser mayor a 60 min."
            }else if( input.min < 0){
                error.min = "No se perminten numeros negativos"
            }
        }else if(input.duracion === 'days'){
            if(input.days < 0){
                error.days = 'No se perminten numeros negativos';
            }
        }
        return error;
}

export function validateField(obj){
        let error = {}
        if(obj.name.length === 0 || !obj.nombre || !obj.dificultad || !obj.duracion || !obj.temporada){
            error.field = 'No pueden haber campos vacios'
        }
        return error
}