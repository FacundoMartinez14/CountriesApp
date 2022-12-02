import { React } from 'react';
import css from '../../Assest/CSS.png';
import github from '../../Assest/Github.png';
import js from '../../Assest/javascritp.png';
import ln from '../../Assest/LinkedIn.png';
import node from '../../Assest/nodeJS.png';
import postgress from '../../Assest/PostgreSQL.png';
import react from '../../Assest/React.png';
import redux from '../../Assest/Redux.png';
import sequelize from '../../Assest/Sequelize.png';
import { Link } from 'react-router-dom';

// import './About.css'
export default function About() {
	return (
		<div className="w-screen h-screen pt-20 ">
			<div className="w-full h-full text-black flex flex-col ">
				<section className="w-2/5 h-1/2 text-justify border border-black m-auto bg-black text-white rounded px-16 pt-5">
					<h1 className="font-bold text-xl py-3">
						Aplicacion creada por Facundo Martinez.
					</h1>
					<p>
						"Countries" es una aplicación en donde se manejan informacion
						publica de paises, regiones y territorios de todo el mundo. Se puede
						buscar por nombre, tanto en Ingles como en Español y filtrar por
						continentes. Ademas se le agrego una seccion en donde se le pueden
						asignar "Actividades turisticas" a cada pais.
					</p>
					<br />
					<p>
						Fue creada con las tecnologias de: CSS, Tailwind, JavaScript, React,
						Redux, NodeJS, Sequelize, Express y PostgreSQL{' '}
					</p>
				</section>
				<div className="flex m-auto w-1/2 items-center justify-evenly">
					<img className="w-20 h-20" src={css} alt="Css" />
					<img className="w-20 h-20" src={js} alt="JavaScript" />
					<img className="w-20 h-20" src={node} alt="NodeJS" />
					<img className="w-20 h-20" src={postgress} alt="PostgreSQL" />
					<img className="w-20 h-20" src={react} alt="React" />
					<img className="w-20 h-20" src={redux} alt="Redux" />
					<img className="w-20 h-20" src={sequelize} alt="Sequelize" />
				</div>
				<footer className="flex justify-center bg-black">
					<h3 className="font-bold text-xl my-auto text-white">
						Puedes contactarme por:
					</h3>
					<a
						href="https://www.linkedin.com/in/facundo-martinez-a11364231/"
						target={'_blank'}
						rel="noreferrer"
					>
						<img className="w-12 h-12 mx-5 my-2" src={ln} alt="LindejIn" />
					</a>
					<a
						href="https://github.com/FacundoMartinez14"
						target={'_blank'}
						rel="noreferrer"
					>
						<img className="w-12 h-12 mx-5 my-2" src={github} alt="Github" />
					</a>
				</footer>
			</div>
		</div>
	);
}
