import './App.css';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/Nav-bar';
import Countries from './components/Countries/Countries';
import CrearActividad from './components/Actividad/CrearActividad';
import About from './components/About/About';
import Filter from './components/Filters/Filters';
import { DetailAct } from './components/Actividad/DetailAct';
import { Detail } from './components/Countries/Detail';
import { Route, Routes } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getCountries, getActivity } from './redux/actions';
function App() {
	const dispatch = useDispatch();
useEffect(() => {
		dispatch(getCountries());
		dispatch(getActivity())
	}, [dispatch]);
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={ [<NavBar />,<Filter /> ,<Countries />]} />
				<Route path="/activities" element={[ <NavBar />, <CrearActividad /> ]} />
				<Route path="/about" element={[<NavBar />, <About /> ]} />
				<Route path="/activities/:id" element={[<NavBar />, <DetailAct />]} />
				<Route path="/home/:id" element={[ <Detail /> ]} />
			</Routes>
		</>
	);
}

export default App;
