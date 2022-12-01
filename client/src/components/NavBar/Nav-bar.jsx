import { React, useState } from 'react';
import { Link } from 'react-router-dom';
// import './Nav-bar.css';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/actions';
import Swal from 'sweetalert2';
export default function NavBar() {
	const dispatch = useDispatch();
	const countries = useSelector((state) => state.countries);
	const [searchLocal, setSearchLocal] = useState('');
	const handleAlert = () => {
		Swal.fire({
			toast: true,
			icon: 'error',
			iconColor: "#df4759",
			title: 'No se ha encontrado el pais.',
			html: '<h1>Por favor intente de nuevo..</h1>',
			confirmButtonText: 'Aceptar',
			background: '#363636',
			color:"#f5f5f5"
		}).then((res) => {
			if (res.isConfirmed) {
				dispatch(search());
				setSearchLocal('');
			}
		});
	};
	const handleChange = (e) => {
		const pais = e.target.value;
		setSearchLocal(pais);
		dispatch(search(pais));
		const country = pais[0].toUpperCase() + pais.slice(1).toLowerCase();
		if (!countries.some((element) => element.traduccion.startsWith(country))) {
			handleAlert();
		}
	};
	return (
		<div className="bg-black text-white h-16 shadow-lg flex justify-between items-center fixed w-screen">
			<div>
				<Link className="ml-8 text-xl" to="/countries">
					Home
				</Link>
				<Link className="ml-8 text-xl" to="/activities">
					Crear Actividad
				</Link>
				<Link className="ml-8 text-xl" to="/about">
					About
				</Link>
			</div>
			<div className="mr-20 rounded">
				<label className="mr-5 text-xl" htmlFor="search">
					Buscador
				</label>
				<input
					className="rounded text-black transition-all duration-200 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
					type="text"
					name="search"
					id="search"
					value={searchLocal}
					onInput={handleChange}
					placeholder="  Buscar..."
					autoComplete="off"
				/>
			</div>
		</div>
	);
}
