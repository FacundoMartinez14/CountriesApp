import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
export default function Landing() {
	return (
		<div className="w-screen h-screen rounded text-white flex flex-col items-center justify-center ">
			<div className="h-2/3 w-1/2 bg-black  flex flex-col items-center justify-center rounded">
				<div className="flex flex-col items-center justify-center rounded border border-white p-10 ">
					<h1 className="mx-auto text-8xl p-16 box font-bold">Bienvenido</h1>
					<Link to="/home">
						<button className="mx-auto border animate-pulse border rounded bg-white text-black p-3 transition duration-200 hover:animate-none hover:border-white hover:bg-black hover:text-white">
							Go Home
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
