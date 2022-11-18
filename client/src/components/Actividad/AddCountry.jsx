import {React, useRef, useEffect} from 'react';
import { addActivity } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './AddCountry.css'
export default function AddCountry({name, flag, id}){
    const dispatch = useDispatch()
    const button = useRef();
    let  renderizado = useRef(0);
    const addcountry = useSelector(state => state.addCountry);
    useEffect(() => {
        if(renderizado === 0){
            renderizado = renderizado + 1;
            return 
        }
        const found = addcountry.find( e => e.name === name);
        if(!found){
            button.current.disabled = false;
        }
    },[addcountry])
    const handleClick = (e) => {
        dispatch(addActivity({name, flag, id}));
        e.target.disabled = true;
    }
    return(
        <>
            <div className='paises-buscados'>
                <h3>{name}</h3>
                <img src={flag} alt="flag" />
                <button onClick={handleClick} ref={button}>+</button>    
            </div>
        </>
    )
}