import { Routes, Route } from 'react-router-dom';
import './App.css';

import ErrorBoundary from '../error/ErrorBoundary/ErrorBoundary';

import { AuthContextProvider } from '../../contexts/AuthContext';

import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import Recipes from '../catalog/recipes/Recipes';
import RecipeList from '../catalog/recipes/RecipeList/RecipeList';
import CreateRecipeForm from '../catalog/recipes/CreateRecipeForm/CreateRecipeForm';
import RecipeDetails from '../catalog/recipes/RecipeDetails/RecipeDetails';
import EditRecipeForm from '../catalog/recipes/EditRecipeForm/EditRecipeForm';
import DeleteRecipeForm from '../catalog/recipes/DeleteRecipeForm/DeleteRecipeForm';
import MyRecipesList from '../catalog/recipes/MyRecipesList/MyRecipesList';
import Favorites from '../catalog/recipes/Favorites/Favorites';
import ErrorPage from '../error/ErrorPage/ErrorPage';
import RouteGuard from '../shared/route-guard/RouteGuard';

function App() {
	return (
		<ErrorBoundary>
			<AuthContextProvider>
				<div className="layout-wrapper">
					<Header />
					<main className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="recipes" element={<Recipes />}>
								<Route index element={<RecipeList />} />
								<Route path=":recipeId">
									<Route index element={<RecipeDetails />} />
									<Route
										path="edit"
										element={
											<RouteGuard isPrivate={true}>
												<EditRecipeForm />
											</RouteGuard>
										} />
									<Route
										path="delete"
										element={
											<RouteGuard isPrivate={true}>
												<DeleteRecipeForm />
											</RouteGuard>
										} />
								</Route>
								<Route
									path="create"
									element={
										<RouteGuard isPrivate={true}>
											<CreateRecipeForm />
										</RouteGuard>
									} />
							</Route>
							<Route path="users">
								<Route path="login" element={
									<RouteGuard isPrivate={false}>
										<Login />
									</RouteGuard>
								} />
								<Route path="register" element={
									<RouteGuard isPrivate={false}>
										<Register />
									</RouteGuard>
								} />
								<Route path=":userId">
									<Route path="recipes" element={
										<RouteGuard isPrivate={true}>
											<MyRecipesList />
										</RouteGuard>
									} />
									<Route path="favorites" element={
										<RouteGuard isPrivate={true}>
											<Favorites />
										</RouteGuard>
									} />
								</Route>
							</Route>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</main>
				</div>
			</AuthContextProvider>
		</ErrorBoundary>
	);
}

export default App;