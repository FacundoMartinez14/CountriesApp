import { React, useState} from 'react';
import './Crear_Actividad.css';
import { useSelector, useDispatch } from 'react-redux';
import { search, postActivity, clean, getActivity } from '../../redux/actions';
import AddCountry from './AddCountry';
import RemoveCountry from './RemoveCountry';
import { useNavigate } from 'react-router-dom';
import { validateField, validateDuracion } from '../Controllers/Controllers';
import Swal from 'sweetalert2';

export default function CrearActividad() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//este estado es para saber en cual de las opciones de duracion estoy
	const [value, setValue] = useState({
		duracion: '',
		min: '',
		hs: '',
		days: '',
		search: '',
	});
	const [position, setPosition] = useState('');
	const [error, setError] = useState({ field: 'inicio' });
	const [form, setForm] = useState({
		name: [],
		nombre: '',
		dificultad: '',
		duracion: '',
		temporada: '',
	});
	const [searchLocal, setSearchLocal] = useState('');
	const [addCountry, setAddCountry] = useState([]);
	const filtered = useSelector((state) => state.filtered);
	const arr = addCountry?.length > 0 && addCountry?.map((e) => e.name);
	const post = useSelector((state) => state.post);

	if (position !== value.duracion) {
		setValue((prev) => ({
			...prev,
			min: '',
			hs: '',
			days: '',
		}));
		setPosition(value.duracion);
	}
	let duration = '';
	if (value.duracion === 'min' && value.min !== '') {
		duration = `${value.min} minutos.`;
	} else if (value.duracion === 'hs' && value.hs !== '') {
		if (value.min === '') {
			duration = `${value.hs}:00 hs.`;
		} else if (value.min > 0 && value.min < 10) {
			duration = `${value.hs}:0${value.min} hs.`;
		} else {
			duration = `${value.hs}:${value.min} hs.`;
		}
	} else if (value.duracion === 'days' && value.days !== '') {
		duration = `${value.days} dias.`;
	}

	let handleChange = (e) => {
		e.preventDefault();
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		let objError = validateDuracion({
			...value,
			[e.target.name]: e.target.value,
		});
		setError(objError);
	};
	const handleSearch = (e) => {
		setSearchLocal(e.target.value);
		dispatch(search(e.target.value));
	};
	const handleInput = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		let objError2 = validateField({ [e.target.name]: e.target.value });
		if (objError2.field || objError2.nombre) {
			setError(objError2);
		} else {
			setError({});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		form.duracion = duration;
		form.name = arr;
		dispatch(postActivity(form));
		e.target.reset();
		setValue((prev) => ({
			...prev,
			duracion: '',
		}));
		setForm((prev) => ({
			...prev,
			nombre: '',
		}));
		Swal.fire({
			title: 'Por favor espera...',
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};
	const handleAlert = (post) => {
		Swal.close();
		Swal.fire({
			icon: 'success',
			title: `${post}`,
			html: '<h1>Puedes ver las actividades al Inicio</h1>',
			showDenyButton: true,
			denyButtonText: 'Ir al Inicio',
			denyButtonColor: '#a4a4a4',
			background: '#363636',
			color: '#f5f5f5',
		}).then((res) => {
			if (res.isConfirmed) {
				dispatch(clean());
				setSearchLocal('');
				setAddCountry([]);
				dispatch(search(''));
				dispatch(getActivity());
			} else if (res.isDenied) {
				dispatch(clean());
				dispatch(search(''));
				dispatch(getActivity());
				navigate('/home');
			}
		});
	};
	return (
		<div className="grid grid-cols-3 pt-20">
			{post?.length > 0 && handleAlert(post)}
			<div className="mt-14">
				<form className="text-black py-8 rounded" onSubmit={handleSubmit}>
					<div className="m-auto flex flex-col">
						<div className='flex flex-col'>
							<label className="m-auto font-bold" htmlFor="name">
								Nombre de la actividad
							</label>
							<br />
							<input
								className="w-10/12 m-auto text-black text-md border border-black"
								type="text"
								name="nombre"
								value={form.nombre}
								onChange={(e) => handleInput(e)}
							/>
						</div>
						<small
							className={`m-auto
								${error.nombre ? 'text-danger font-bold' : 'text-white font-bold'}
							`}
						>
							Solo letras en el nombre
						</small>
					</div>
					<div className="flex flex-col">
						<label className="m-auto font-bold" htmlFor="dificultad">
							Dificultad
						</label>
						<br />
						<select
							className="w-10/12 m-auto hover:cursor-pointer text-black border border-black"
							name="dificultad"
							id="dificultad"
							onChange={(e) => handleInput(e)}
							defaultValue={'DEFAULT'}
						>
							<option disabled value="DEFAULT">
								-
							</option>
							<option value="1">Principiante</option>
							<option value="2">Amateur</option>
							<option value="3">Intermedio</option>
							<option value="4">Avanzado</option>
							<option value="5">Profesional</option>
						</select>
					</div>
					<br />
					<div className="flex flex-col">
						<label className="m-auto font-bold" htmlFor="duracion">
							Duracion{' '}
						</label>
						<br />
						<select
							className="w-10/12 m-auto text-black hover:cursor-pointer border border-black"
							name="duracion"
							id="duracion"
							onChange={handleChange}
							defaultValue={'DEFAULT'}
						>
							<option disabled value="DEFAULT">
								-
							</option>
							<option value="min">Minutos</option>
							<option value="hs">Horas</option>
							<option value="days">Dias</option>
						</select>
						<br />
						{value.duracion === 'min' ? (
							<div className="m-auto text-black flex flex-col">
								<div className="m-auto">
									<input
										className="text-black border border-black"
										type="number"
										name="min"
										value={value.min}
										onChange={handleChange}
									/>
									<label htmlFor="min">minutos.</label>
								</div>
								<small
									className={
										error.min ? 'text-danger font-bold' : 'text-white font-bold'
									}
								>
									Si la duracion es mayor de 60 minutos, elija la opcion de
									'Horas'
								</small>
							</div>
						) : value.duracion === 'hs' ? (
							<div className="m-auto text-black">
								<div>
									<input
										className="mb-3 border border-black"
										type="number"
										name="hs"
										value={value.hs}
										onChange={handleChange}
									/>
									<label className="text-black" htmlFor="hs">
										horas
									</label>
									<br />
									<small className={error.hs ? 'text-danger' : 'text-white'}>
										'Si la duracion es mayor de 24hs, elija la opcion "Dias"'
									</small>
								</div>
								<div>
									<input
										className="border border-black"
										type="number"
										name="min"
										value={value.min}
										onChange={handleChange}
									/>
									<label className="text-black" htmlFor="min">
										minutos.
									</label>
									<br />
									<small
										className={`mt-1 ${
											error.min ? 'text-danger' : 'text-white'
										}`}
									>
										{error.min ? error.min : 'No hay error'}
									</small>
								</div>
							</div>
						) : value.duracion === 'days' ? (
							<div className="m-auto text-black ">
								<input
									className="border border-black"
									type="number"
									name="days"
									value={value.days}
									onChange={handleChange}
								/>
								<label className="text-black" htmlFor="days">
									dias.
								</label>
								{error.days && (
									<small className={error.days && 'danger'}>{error.days}</small>
								)}
							</div>
						) : null}
					</div>
					<div className="flex flex-col mt-1">
						<label className="m-auto font-bold" htmlFor="temporada">
							Temporada
						</label>
						<br />
						<select
							className="w-10/12 m-auto text-black hover:cursor-pointer border border-black"
							name="temporada"
							id="temporada"
							onChange={(e) => handleInput(e)}
							defaultValue={'DEFAULT'}
						>
							<option disabled value="DEFAULT">
								-
							</option>
							<option value="verano">Verano</option>
							<option value="otoño">Otoño</option>
							<option value="invierno">Invierno</option>
							<option value="primavera">Primavera</option>
						</select>
						<br />
						<input
							className="bg-black text-white border border-black w-1/6 rounded m-auto transition duration-200 hover:text-black hover:bg-white hover:cursor-pointer disabled:border-gray disabled:bg-gray disabled:text-white disabled:cursor-auto"
							type="submit"
							value="Enviar"
							disabled={
								error.field || !arr || duration?.length === 0 ? true : false
							}
						/>
					</div>
				</form>
			</div>
			<div className="mt-14 max-h-[445px] flex flex-col">
				<div className="m-auto mb-3 text-black font-bold">
					<label className="m-auto" htmlFor="search">
						Seleccione los paises{' '}
					</label>
					<input
						className="ml-2 border border-black rounded font-normal"
						type="text"
						name="search"
						id="search"
						onInput={handleSearch}
						placeholder=" Buscar..."
						autoComplete="off"
						value={searchLocal}
					/>
				</div>
				<div
					id="addcountry"
					className="overflow-auto min-h-full max-h-full flex flex-col items-center"
				>
					{filtered.map((e) => (
						<AddCountry
							key={e.id}
							id={e.id}
							name={e.traduccion}
							flag={e.flag}
							setAddCountry={setAddCountry}
							addCountry={addCountry}
						/>
					))}
					<br />
				</div>
			</div>
			<div className="mt-14 max-h-[445px] min-h-[445px] flex flex-col">
				<h3 className="p-2 mx-auto font-bold">Paises seleccionados</h3>
				<div
					id="removecountry"
					className="mx-10 items-center flex flex-col overflow-auto"
				>
					{addCountry?.length > 0
						? addCountry?.map((e) => (
								<RemoveCountry
									key={e.id}
									name={e.name}
									flag={e.flag}
									setAddCountry={setAddCountry}
									addCountry={addCountry}
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
}
