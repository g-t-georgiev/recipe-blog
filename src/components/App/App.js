import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from '../../contexts/AuthContext';

import './App.css';

import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';

function App() {
	return (
		<AuthContextProvider>
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
		</AuthContextProvider>
	);
}

export default App;