import {React} from 'react';
import { deleteActivity } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { getActivity, prioridad } from '../../redux/actions';
import './DetailAct.css'


export function DetailAct({nombre, id, duracion, temporada, dificultad, countries}){
    const dispatch = useDispatch()

    const handleClick = (e) =>{
        dispatch(deleteActivity(id))
        dispatch(getActivity())
        dispatch(prioridad(''))
        dispatch(prioridad('activity'))
    }
    return(
        <>  
        <div className='detail'>
            <button onClick={handleClick}>DELETE</button>
            <h3>Actividad: {nombre}</h3>
            <h3>Dificultad {dificultad === '5' ? 'Profesional' : dificultad === '4' ? 'Avanzado' : dificultad === '3' ? 'Intermedio' : dificultad === '2' ? 'Amateur' : 'Principiante'}</h3>
            <h3>Temporada: {temporada[0].toUpperCase() + temporada.substring(1)}</h3>
            <h3>Duracion: {duracion}</h3>
            <h3>Paises en donde se puede practicar esta actividad:</h3>
            {countries ? countries.map( e => 
                <div key={e.id}>
                    <img src={e.flag} alt="flag" />
                    <h4>{e.traduccion}</h4>
                </div>) : null}
        </div>
        </>
    )
}