import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { forcePage } from '../../redux/actions';
import { Detail } from './Detail';
import Countrie from './Countrie';
import Paginado from './Paginado';
import { DetailAct } from '../Actividad/DetailAct';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useModal } from '../Controllers/useModal';

export default function Countries() {
	const dispatch = useDispatch();
	//usamos un useEffect para que al momento de montarse el componente, traiga todo los paises
	//Accedemos a todos los estados de redux mediante useSelector para usarlos con un metodo .map
	const [isOpen, openModal, closeModal] = useModal(false);
	const [id, setId] = useState(0);
	let filtered = useSelector((state) => state.filtered);
	const orden = useSelector((state) => state.orden);
	const prior = useSelector((state) => state.prioridad);
	let page = useSelector((state) => state.page);
	let activities = useSelector((state) => state.actividad);
	const paginate = (pagina) => {
		dispatch(forcePage(pagina));
	};

	const lastIndex = page === 1 ? page * 9 : page * 10 - 1;
	const firstIndex = lastIndex - (page === 1 ? 9 : 10);
	let currentPosts =
		prior === 'activity'
			? activities?.slice(firstIndex, lastIndex)
			: filtered?.slice(firstIndex, lastIndex);
	const handleClick = (action) => {
		window.scrollTo(0, 0);
		if (prior === 'activity') {
			if (action === 'siguiente') {
				if (activities.length <= lastIndex) {
					dispatch(forcePage(1));
				} else {
					dispatch(forcePage(page + 1));
				}
			} else if (action === 'anterior') {
				if (page === 1) {
					dispatch(forcePage(Math.ceil((activities.length - 9) / 10) + 1));
				} else {
					dispatch(forcePage(page - 1));
				}
			}
		}else{
			if (action === 'siguiente') {
				if (filtered.length <= lastIndex) {
					dispatch(forcePage(1));
				} else {
					dispatch(forcePage(page + 1));
				}
			} else if (action === 'anterior') {
				if (page === 1) {
					dispatch(forcePage(Math.ceil((filtered.length - 9) / 10) + 1));
				} else {
					dispatch(forcePage(page - 1));
				}
			}

		}
	};
	const handleModal = (id) => {
		openModal();
		setId(id);
	};

	return (
		<div className="ml-48 pt-16">
			{console.log(prior)}
			{isOpen ? (
				<Detail id={id} isOpen={isOpen} closeModal={closeModal} />
			) : null}
			<div className="flex flex-col items-center fixed w-11/12 bg-white mr-10">
				{!isOpen ? (
					<div>
						<button
							className="mx-3 mb-2 shadow-md border border-black rounded p-1 text-white bg-black transition-all duration-200 hover:text-black hover:bg-white hover:shadow-white active:bg-gray"
							onClick={(e) => handleClick('anterior')}
						>
							<ChevronLeftIcon className="w-5" />
						</button>
						<button
							className="mx-3 mb-2 mt-2 shadow-md border border-black rounded p-1 text-white bg-black transition-all duration-200 hover:text-black hover:bg-white hover:shadow-white active:bg-gray"
							onClick={(e) => handleClick('siguiente')}
						>
							<ChevronRightIcon className="w-5" />
						</button>
					</div>
				) : null}
				{!isOpen ? (
					<Paginado
						array={prior === 'activity' ? activities : filtered}
						currentPage={page}
						paginate={paginate}
						length={
							prior === 'activity' ? activities.length : filtered.length
						}
					/>
				) : null}
			</div>
			<div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4 mt-24">
				{prior === 'activity'
					? currentPosts.map((e) => (
							<DetailAct
								key={e.id}
								nombre={e.nombre}
								id={e.id}
								duracion={e.duracion}
								temporada={e.temporada}
								dificultad={e.dificultad}
								countries={e.countries}
							/>
					  ))
					: currentPosts.length > 0 &&
					  currentPosts.map((e) => (
							<button key={e.id} onClick={() => handleModal(e.id)}>
								<Countrie
									name={e.traduccion}
									flag={e.flag}
									id={e.id}
									continent={e.continent}
								/>
							</button>
					  ))}
			</div>
		</div>
	);
}
