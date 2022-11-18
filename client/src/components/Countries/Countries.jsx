import {React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, search, forcePage } from '../../redux/actions';
import Countrie from './Countrie'
import {Link} from 'react-router-dom'
import Paginado from './Paginado';
import  {DetailAct}  from '../Actividad/DetailAct';
import './Countries.css'


export default function Countries(){
    const dispatch = useDispatch()
    //usamos un useEffect para que al momento de montarse el componente, traiga todo los paises
    useEffect(() =>{
        dispatch(getCountries());
        
    },[dispatch])
    //Accedemos a todos los estados de redux mediante useSelector para usarlos con un metodo .map
    
    const countries = useSelector(state => state.countries)
    let filtered = useSelector(state => state.filtered)
    const orden = useSelector(state => state.orden)
    const prior = useSelector(state => state.prioridad)
    let page = useSelector(state => state.page)
    let activities = useSelector(state => state.actividad)
    const paginate = (pagina) => {
        dispatch(forcePage(pagina))
  
    }
    
    const lastIndex = (page === 1 ? page * 9 : (page * 10 - 1))
    const firstIndex = lastIndex - (page === 1 ? 9 :  10);
    let currentPosts = (activities.length > 0 ? activities.slice(firstIndex, lastIndex) : filtered.slice(firstIndex, lastIndex))
//usamos el handleChange para que se haga un search a medida que se va escribiendo
    const handleChange = (e) => {
        if(e.target.value.length > 0){
            dispatch(search(e.target.value));
        }else{
            dispatch(getCountries())
        }
    }
    const handleClick = (e) => {
        if(prior === 'activities'){
            if(e.target.name === "siguiente"){
                if(activities.length <= lastIndex){
                    dispatch(forcePage(1))
                }else{
                    dispatch(forcePage(page + 1))
                }
            }else if(e.target.name === 'anterior'){
                if(page === 1){
                    dispatch(forcePage((Math.ceil((activities.length - 9)  / 10) + 1)))
                }else{
                    dispatch(forcePage(page - 1))
                }
            }
        }
        if(e.target.name === "siguiente"){
            if(filtered.length <= lastIndex){
                dispatch(forcePage(1))
            }else{
                dispatch(forcePage(page + 1))
            }
        }else if(e.target.name === 'anterior'){
            if(page === 1){
                dispatch(forcePage((Math.ceil((filtered.length - 9)  / 10) + 1)))
            }else{
                dispatch(forcePage(page - 1))
            }
        }
    }
    
    
    return(
        <div>
            {console.log(currentPosts)}
            <div className='buscador'>
                <label htmlFor="search">Buscador</label>
                <input type="text" name='search' id='search' onInput={handleChange} placeholder = 'Buscar...' autoComplete='off'/>
            </div>
                 <div className='filtrados'>
                    <div className='paginado'>
                        
                        {currentPosts.length <= 9 && prior === 'activity'?
                            null
                            :<>
                            <button name='anterior' onClick={handleClick}>Anterior</button>
                            <button name='siguiente' onClick={handleClick}>Siguiente</button>
                        </>}
                            
                        <br />
                        <Paginado array = {activities.length > 0 ? activities : filtered } currentPage = {page} paginate = {paginate} length={activities.length > 0 ? activities.length : filtered.length  }/>
                    </div>
                    <div className='countries'>
                        {prior === 'activity' ?  activities.map(e => <DetailAct
                        key={e.id}
                        nombre={e.nombre}
                        id = {e.id}
                        duracion = {e.duracion}
                        temporada= {e.temporada}
                        dificultad = {e.dificultad}
                        countries = {e.countries}
                        />) : currentPosts.length > 0 ? currentPosts.map( e => <Link key = {e.id} to={`/countries/${e.id}`}><Countrie
                        name={e.traduccion}
                        flag = {e.flag}
                        id = {e.id}
                        continent = {e.continent} 
                        /></Link>) 
                        :countries.map( e => <Link key = {e.id} to={`/countries/${e.id}`}><Countrie
                        name={e.traduccion}
                        flag = {e.flag}
                        id = {e.id}
                        continent = {e.continent} 
                        /></Link>)}

                    </div>
                </div>
        </div>
    )
}