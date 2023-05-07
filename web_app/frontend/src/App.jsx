import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WatchListPage from './pages/WatchListPage';
import RatedPage from './pages/RatedPage';
import MoviePage from './pages/MoviePage';
import PersonPage from './pages/PersonPage';
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
					<Route path='person/:personId' element={<PersonPage />} />
					<Route path='homePage' element={<HomePage />} />
					<Route path='searchPage' element={<SearchPage />} />
					<Route path='watchListPage' element={<WatchListPage />} />
					<Route path='ratedPage' element={<RatedPage />} />
					<Route path='user' element={<User />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
