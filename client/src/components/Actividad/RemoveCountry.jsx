import {React} from 'react';
import './RemoveCountry.css'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
export default function RemoveCountry({name, flag, setAddCountry, addCountry}){
    const handleClick = (e) =>{
        const removedCountry = addCountry.filter( e => e.name !== name);
        setAddCountry(removedCountry)
        console.log(removedCountry)
    }
    return(
        <>
            <div className={name.length > 20 ? "w-8/12 h-16 flex justify-end my-2 border p-2 rounded items-center" : "w-8/12 h-10 flex justify-end my-2 border p-2 rounded"}>
                <h3 className='mx-5'>{name}</h3>
                <img className="h-6 w-7 mx-3 shadow-xl rounded" src={flag} alt="flag" />
                <button onClick={handleClick}>
                    <MinusCircleIcon className='w-6 rounded-full transition duration-200 hover:text-white hover:bg-black' />
                </button>
            </div>
        </>

    )
}