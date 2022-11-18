import {React, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries} from '../../redux/actions';
import './Detail.css'

export function Detail(){
    const dispatch = useDispatch()
    const {id} = useParams();
    const countries = useSelector(state => state.countries);
    const post = useSelector(state => state.post)
    useEffect(() => {
        dispatch(getCountries());
        if(renderizado === 0){
            renderizado = renderizado + 1;
            return 
        }
    },[post])
    const detail = countries.find( e => e.id === id);
    let  renderizado = useRef(0);
    
    return(
        <>  
        <div className='detail-country'>
            {countries.length > 0 ? <div className='animation'>
                <h1>{detail.traduccion}</h1>
                <img src={detail.flag} alt="flag" />
                <h3>Continente: {detail.continent}</h3>
                <h4>Capital: {detail.capital}</h4>
                <h4>Subregion: {detail.subregion}</h4>
                <h4>Poblacion: {detail.population}</h4>
                <h4>Superficie: {detail.area} km² </h4>
                <h3>Actividades: </h3>
                    {detail.activities.length > 0 ? detail.activities.map( e => <div  key ={e.id}><h4 >{e.nombre}</h4></div> ) : null}
                    <br />
            </div> : null}
        </div>
            
        </>
    )
}