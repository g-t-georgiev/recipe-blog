import { Routes, Route } from 'react-router-dom';

import cssClasses from './App.module.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

function App() {
	return (
		<div className={cssClasses['layout-wrapper']}>
			<Header />
			<main className={cssClasses['main-content']}>
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