import {React} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCountryFromActivity } from '../../redux/actions';
import './RemoveCountry.css'

export default function RemoveCountry({name, flag}){
    const dispatch = useDispatch()
    const addcountry = useSelector(state => state.addCountry)
    const handleClick = (e) =>{
        const removedCountry = addcountry.filter( e => e.name !== name);
        dispatch(removeCountryFromActivity(removedCountry));
    }
    return(
        <>
            <div className='paises-seleccionados'>
                <h3>{name}</h3>
                <img src={flag} alt="flag" />
                <button onClick={handleClick}> - </button>
            </div>
        </>

    )
}