import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import RequireAuth from './components/auth/RequireAuth';
import User from './components/user/User';

const App = () => {
	return (
		
		<Routes>
			{/* app routes */}
			<Route path='/' element={<MainLayout />}>
				{/* public routes */}
				<Route index element={<RegisterPage />} />
				<Route path='loginPage' element={<LoginPage />} />

				{/* protected routes */}
				<Route element={<RequireAuth />}>
					<Route path='movie/:movieId' element={<MoviePage />} />
					<Route path='homePage' element={<HomePage />} />
					<Route path='user' element={<User />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
