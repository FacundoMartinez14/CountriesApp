import { React, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export function Detail({ id, isOpen, closeModal }) {
	const countries = useSelector((state) => state.countries);
	const post = useSelector((state) => state.post);
	useEffect(() => {
		if (renderizado === 0) {
			renderizado = renderizado + 1;
			return;
		}
	}, [post]);
	const detail = countries?.find((e) => e.id === id);
	let renderizado = useRef(0);
	return (
		<div
			className={`h-full fixed w-full  ${
				isOpen ? 'flex' : 'hidden'
			} bg-black bg-opacity-50`}
			onClick={closeModal}
		>
			{countries.length > 0 ? (
				<div className="m-auto h-5/7 w-1/4 bg-white absolute top-20 left-[28rem] text-black flex flex-col z-50 items-center rounded shadow-md shadow-white">
					<h1 className="p-5 font-bold text-xl">{detail.traduccion}</h1>
					<img className='shadow-xl' src={detail.flag} alt="flag" />
					<div className="flex flex-col items-start w-3/5 h-10/12 mt-10 justify-evenly ">
						<h3 className='font-bold'>Continente: <span className='font-normal'>{detail.continent}</span> </h3>
						<h4 className='font-bold'>Capital: <span className='font-normal'>{detail.capital}</span></h4>
						<h4 className='font-bold'>Subregion: <span className='font-normal'>{detail.subregion}</span></h4>
						<h4 className='font-bold'>Poblacion: <span className='font-normal'>{detail.population}</span> </h4>
						<h4 className='font-bold'>Superficie: <span className='font-normal'>{detail.area} km²</span> </h4>
						<h3 className='font-bold'>Actividades:</h3>
						{detail.activities.length > 0
							? detail.activities.map((e) => (
									<div className='pb-2' key={e.id}>
										<h4>{e.nombre}</h4>
									</div>
							  ))
							: null}
					</div>
					<br />
				</div>
			) : null}
		</div>
	);
}
