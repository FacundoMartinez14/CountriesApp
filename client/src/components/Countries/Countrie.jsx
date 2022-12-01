import { React } from 'react';
import { useSelector } from 'react-redux';
// import './Countrie.css'

export default function Countrie({
	name,
	flag,
	continent,
	id,
	duracion,
	temporada,
	dificultad,
	countriesIn,
}) {
	const prior = useSelector((state) => state.prioridad);

	return (
		<div className="border border-white border-2 rounded m-5 h-52 transition-all duration-200 hover:border-black hover:shadow-2xl ">
			{prior === 'activity' ? (
				<div>
					<h3>{name}</h3>
					<h3>{duracion}</h3>
					<h3>{temporada}</h3>
				</div>
			) : (
				<div className="h-full flex flex-col items-center justify-center">
					{name?.length > 30 ? (
						<h5 className="font-bold text-xl mb-2">{name}</h5>
					) : name?.length > 20 ? (
						<h4 className="font-bold text-xl mb-2">{name}</h4>
					) : (
						<h2 className="font-bold text-xl mb-2">{name}</h2>
					)}
					<h3 className='mb-2'>{continent}</h3>
					<img src={flag} className="w-1/2 max-h-[125px] shadow-lg" alt="bandera" />
				</div>
			)}
		</div>
	);
}
