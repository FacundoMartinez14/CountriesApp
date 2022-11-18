import {React} from 'react';
import css from '../../Assest/CSS.png'
import github from '../../Assest/Github.png'
import js from '../../Assest/javascritp.png'
import ln from '../../Assest/LinkedIn.png'
import node from '../../Assest/nodeJS.png'
import postgress from '../../Assest/PostgreSQL.png'
import react from '../../Assest/React.png'
import redux from '../../Assest/Redux.png'
import sequelize from '../../Assest/Sequelize.png'
import {Link} from "react-router-dom"

import './About.css'
export default function About(){
    return(
        <>
            <div className='about'>
                <section>
                    <h1>Aplicacion creada por Facundo Martinez.</h1>
                    <p>"Countries" es una aplicación en donde se manejan informacion publica de paises, regiones y territorios de todo el mundo.
                    Se puede buscar por nombre, tanto en Ingles como en Español y filtrar por continentes. Ademas se le agrego una seccion en donde se le pueden asignar "Actividades turisticas" a cada pais.
                    </p>
                    <br />
                    <p>Fue creada con las tecnologias de: CSS, JavaScript, React, Redux, NodeJS, Sequelize, Express y PostgreSQL </p>
                </section>
                <div className='imgs'>
                    <img src={css} alt="Css" />
                    <img src={js} alt="JavaScript" />
                    <img src={node} alt="NodeJS" />
                    <img src={postgress} alt="PostgreSQL" />
                    <img src={react} alt="React" />
                    <img src={redux} alt="Redux" />
                    <img src={sequelize} alt="Sequelize" />       
                </div>
                <footer>
                    <h3>Puedes contactarme por:</h3>
                    <a href="https://www.linkedin.com/in/facundo-martinez-a11364231/" target={'_blank'}>
                        <img src={ln} alt="LindejIn" />
                    </a>
                    <a href="https://github.com/FacundoMartinez14" target={'_blank'}>
                        <img src={github} alt="Github" />
                    </a>
                </footer>
            </div>
        </>

    )
}