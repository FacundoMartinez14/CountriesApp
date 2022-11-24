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

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/countries" element={ <Countries />} />
				<Route path="/activities" element={[<CrearActividad />, <NavBar />]} />
				<Route path="/about" element={[<About />, <NavBar />]} />
				<Route path="/activities/:id" element={[<DetailAct />, <NavBar />]} />
				<Route path="/countries/:id" element={[<Detail />, <NavBar />]} />
			</Routes>
		</>
	);
}

export default App;
