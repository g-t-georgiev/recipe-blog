import { Routes, Route } from 'react-router-dom';
import './App.css';

import ErrorBoundary from '../error/ErrorBoundary/ErrorBoundary';

import { AuthContextProvider } from '../../contexts/AuthContext';

import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';

function App() {
	return (
		<ErrorBoundary>
			<AuthContextProvider>
				<div className="layout-wrapper">
					<Header />
					<main className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/recipes" element={<Home />} />
							<Route path="/users/login" element={<Login />} />
							<Route path="/users/register" element={<Register />} />
						</Routes>
					</main>
				</div>
			</AuthContextProvider>
		</ErrorBoundary>
	);
}

export default App;