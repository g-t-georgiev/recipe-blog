import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

function App() {
	return (
		<div className="layout-wrapper">
			<Header />
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/register" element={<Register />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;