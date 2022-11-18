import {React} from 'react'
import { Link } from 'react-router-dom'
import './Nav-bar.css'

export default function NavBar(){
    return(
        <div className='nav'>
            <Link className='nav-item' to='/activities'>Crear Actividad</Link>
            <Link className='nav-item' to='/about'>About</Link>
            <Link className='nav-item' to='/countries'>Home</Link>
        </div>
    )
}