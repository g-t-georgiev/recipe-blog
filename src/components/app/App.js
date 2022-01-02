import { Routes, Route } from 'react-router-dom';

import ErrorBoundary from '../error/error-boundary/ErrorBoundary';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { RecipeContextProvider } from '../../contexts/RecipeContext';
import Layout from '../shared/layout/Layout';
import Content from '../shared/content/Content';
import Section from '../shared/section/Section';
import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import Recipes from '../catalog/recipes/Recipes';
import RecipeList from '../catalog/recipes/recipe-list/RecipeList';
import CreateRecipeForm from '../catalog/recipes/create-recipe-form/CreateRecipeForm';
import RecipeDetails from '../catalog/recipes/recipe-details/RecipeDetails';
import EditRecipeForm from '../catalog/recipes/edit-recipe-form/EditRecipeForm';
import DeleteRecipeForm from '../catalog/recipes/delete-recipe-form/DeleteRecipeForm';
import MyRecipesList from '../catalog/recipes/my-recipes-list/MyRecipesList';
import Favorites from '../catalog/recipes/favorites/Favorites';
import Page404 from '../404/Page404';
import RouteGuard from '../shared/route-guard/RouteGuard';

function App() {
	return (
		<ErrorBoundary>
			<AuthContextProvider>
				<Layout>
					<Header />
					<Content>
						<Routes>
							<Route path="/" element={<Section />}>
								<Route 
									index 
									element={<Home />} 
								/>

								<Route path="recipes" element={<Recipes />}>
									<Route 
										index 
										element={<RecipeList />} 
									/>

									<Route path=":recipeId" element={<RecipeContextProvider />}>
										<Route 
											index 
											element={<RecipeDetails />} 
										/>

										<Route
											path="edit"
											element={
												<RouteGuard isPrivate={true}>
													<EditRecipeForm />
												</RouteGuard>
											} 
										/>

										<Route
											path="delete"
											element={
												<RouteGuard isPrivate={true}>
													<DeleteRecipeForm />
												</RouteGuard>
											} 
										/>
									</Route>

									<Route
										path="create"
										element={
											<RouteGuard isPrivate={true}>
												<CreateRecipeForm />
											</RouteGuard>
										} 
									/>
								</Route>

								<Route path="users">
									<Route path="login" element={
											<RouteGuard isPrivate={false}>
												<Login />
											</RouteGuard>
										} 
									/>

									<Route path="register" element={
											<RouteGuard isPrivate={false}>
												<Register />
											</RouteGuard>
										} 
									/>

									<Route path=":userId">
										<Route path="recipes" element={
												<RouteGuard isPrivate={true}>
													<MyRecipesList />
												</RouteGuard>
											} 
										/>

										<Route path="favorites" element={
												<RouteGuard isPrivate={true}>
													<Favorites />
												</RouteGuard>
											} 
										/>
									</Route>
								</Route>

								<Route 
									path="*" 
									element={<Page404 />} 
								/>
							</Route>
						</Routes>
					</Content>
				</Layout>
			</AuthContextProvider>
		</ErrorBoundary >
	);
}

export default App;