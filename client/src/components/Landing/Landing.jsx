import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'
export default function Landing(){
    return (
        <div className='box'>
            <h1 className='titulo'>Bienvenido</h1>
            <Link to='/countries'><button>Go Home</button></Link>
        </div>
    )
}