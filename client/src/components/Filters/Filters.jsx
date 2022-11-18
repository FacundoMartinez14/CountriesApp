import {React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterAction, prioridad, getActivity, sort, forcePage, orden, firstFilter, addFilter, removeFilter, clean } from '../../redux/actions';
import { az, za, populationAsc, populationDes } from '../Controllers/Controllers';
import './Filters.css'
//componente encargado de los filtros
export default function Filter(){
    const dispatch = useDispatch();
    let countries = useSelector( state => state.countries)
    const filteredd = useSelector(state => state.filtered)
    const order = useSelector( state => state.orden)
    const pivot = useSelector( state => state.pivot)

    //usamos handleChange para el dispatch para que asi, se renderize en el momento del click en el input
    // accedemos a la propiedad checked del checkbox, asi filtramos lo que necesitamos
    let handleChange = (e, id) =>{
        let checked = document.getElementById(id).checked;
        const valor = e.target.value
        
        if(checked){
            const filtered = countries.filter( (e) => e.continent === valor)
            if(pivot === 0){               
                    dispatch(firstFilter(filtered))
            }else{
                    dispatch(addFilter(filtered))                
            }            
        }else{
            const remove = filteredd.filter( e => e.continent !== valor );
            dispatch(removeFilter(remove));
            if(remove.length === 0){
                dispatch(filterAction(countries))
            }
        }
        dispatch(forcePage(1))
    }
    const hendleClick = (e) =>{
        let checked = document.getElementById(e.target.id).checked;
        if(checked){
            dispatch(prioridad('activity'));
            dispatch(getActivity())
            dispatch(forcePage(1))
        }else{
            dispatch(clean())
            dispatch(prioridad(''))
        }
        dispatch(forcePage(1))
    }
    const orderByName = (e) =>{
        if( order === 'ordenAZ'){
            dispatch(orden('ordenZA'));
            dispatch(sort(za));
            
        }else{
            dispatch(orden('ordenAZ'));
            dispatch(sort(az));
        }
    dispatch(forcePage(1))
    }
    const orderByPopulation = (e) =>{
        if( order === 'Asc'){
            dispatch(orden('Des'));
            dispatch(sort(populationDes));
        }else{
            dispatch(orden('Asc'));
            dispatch(sort(populationAsc));
        }
    }
    const handleFilter = (e) => {
        let checked = document.getElementById(e.target.id).checked;
        const population = Number(e.target.value) 
        const filtered = countries.filter( (c) => c.population > population) 
        if(checked){
            dispatch(filterAction(filtered));
        }else{
            dispatch(removeFilter(filtered));
        }
    } 
    return(
        <>
            <form className='filters'>
                <fieldset className='continents'>
                        <legend>Continents</legend>
                        <div>
                            <input type="checkbox" name="oceania" id="oceania" value="Oceania"  onChange={(e) => handleChange(e, 'oceania')}  />
                            <label htmlFor="oceania">Oceania</label>
                        </div>
                    <br />
                        <div>
                            <input type="checkbox" name="africa" id="africa" value="Africa" onChange={(e) => handleChange(e, 'africa')}  />
                            <label htmlFor="africa">Africa</label>
                        </div>
                    <br />
                        <div>
                            <input type="checkbox" name="europa" id="europa" value="Europe" onChange={(e) => handleChange(e, 'europa')}  />
                            <label htmlFor="europa">Europa</label>
                        </div>
                    <br />
                        <div>
                            <input type="checkbox" name="asia" id="asia" value="Asia" onChange={(e) => handleChange(e, 'asia')}  />
                            <label htmlFor="asia">Asia</label>
                            </div>
                    <br />
                        <div>
                            <input type="checkbox" name="america" id="america" value="Americas" onChange={(e) => handleChange(e, 'america')} />
                            <label htmlFor="america">America</label>
                        </div>
                    <br />
                        <div>
                            <input type="checkbox" name="antarctica" id="antartida" value="Antarctic" onChange={(e) => handleChange(e, 'antartida')} />
                            <label htmlFor="antartica">Antartida</label>
                        </div>
                </fieldset>
                <fieldset>
                    <legend>Actividades</legend>
                    <div className='activi-orden'>
                    <input type='checkbox' name='activities' id='activities' onChange={hendleClick} />
                    <label htmlFor="activities">Trae todas las actividades</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Ordenar alfabeticamente</legend>
                        <div>
                    <button type='button' onClick={orderByName}>{order === 'ordenAZ'? 'Z - A' : 'A - Z'}</button>
                        </div>
                </fieldset>
                <fieldset>
                    <legend>Ordenar por poblacion</legend>
                    <button type='button' onClick={orderByPopulation}>{order === 'Asc'? 'Descendente' : 'Ascendente'}</button>
                </fieldset>
            </form>
        </>
        
    )
}