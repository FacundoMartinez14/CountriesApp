import { React, useRef, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
export default function AddCountry({ name, flag, id, setAddCountry, addCountry}) {
	const button = useRef();
	let renderizado = useRef(0);
	useEffect(() => {
		if (renderizado === 0) {
			renderizado = renderizado + 1;
			return;
		}
		const found = addCountry.find((e) => e.name === name);
		if (!found) {
			button.current.disabled = false;
		}
	}, [addCountry]);
	const handleClick = (e) => {
		setAddCountry(prev => [...prev, { name, flag, id }])
		button.current.disabled = true;
	};
	return (
		<>
			<div className= {name.length > 25 ? "w-7/12 h-16 flex justify-end my-2 border p-2 rounded items-center" : "w-7/12 h-10 flex justify-end my-2 border p-2 rounded"}>
				<h3 className="mx-5 text-sm">{name}</h3>
				<img className="h-6 w-7 mx-3 shadow-xl rounded " src={flag} alt="flag" />
				<button onClick={addCountry.find((e) => e.name === name) ? null : handleClick} ref={button}>
					{addCountry.find((e) => e.name === name) ? (
						<PlusCircleIcon className=" w-6 rounded-full transition-all duration-200 bg-gray text-white" />
					) : (
						<PlusCircleIcon className=" w-6 rounded-full transition duration-200 hover:text-white hover:bg-black " />
					)}
				</button>
			</div>
		</>
	);
}
