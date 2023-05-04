import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ResponsiveAppBar from '../common/ResponsiveAppBar';

const MainLayout = () => {
	return (
		<>
			{/* header */}
			<ResponsiveAppBar position="sticky"/>
			{/* header */}

			{/* main */}
			<Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
					<Outlet />
				</Box>
			{/* main */}

			{/* footer */}

			{/* footer */}
		</>
	);
};

export default MainLayout;
