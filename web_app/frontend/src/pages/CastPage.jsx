import { Box, Toolbar, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonMediaGrid from '../components/common/PersonMediaGrid';
import tmdbConfigs from '../configs/tmdb.configs';
import uiConfigs from '../configs/ui.configs';
import Container from '../components/common/Container';
import { useLazyGetDetailsQuery } from '../redux/features/castApiSlice';
import FormBox from '../components/common/FormBox';

const CastPage = () => {
	const { personId } = useParams();

	const [person, setPerson] = useState();

	const [fetchDetails, { isLoading }] = useLazyGetDetailsQuery();

	useEffect(() => {
		const getPerson = async () => {
			const response = await fetchDetails({ personId }).unwrap();

			if (response) setPerson(response);
		};

		getPerson();
	}, [personId]);

	return isLoading ? (
		<FormBox>
			<h1 color='#fff'>Loading...</h1>
		</FormBox>
	) : (
		<>
			<Toolbar />
			{person && (
				<>
					<Box sx={{ ...uiConfigs.style.mainContent }}>
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								flexDirection: { xs: 'column', md: 'row' },
							}}
						>
							<Box
								sx={{
									width: { xs: '50%', md: '20%' },
								}}
							>
								<Box
									sx={{
										paddingTop: '160%',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundColor: 'darkgrey',
										backgroundImage: `url(${tmdbConfigs.posterPath(
											person.profile_path
										)})`,
									}}
								/>
							</Box>
							<Box
								sx={{
									width: { xs: '100%', md: '80%' },
									padding: { xs: '1rem 0', md: '1rem 2rem' },
								}}
							>
								<Stack spacing={2}>
									<Typography variant='h5' fontWeight='700'>
										{`${person.name} (${
											person.birthday && person.birthday.split('-')[0]
										}`}
										{person.deathday &&
											` - ${person.deathday && person.deathday.split('-')[0]}`}
										{')'}
									</Typography>
									<Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
										{person.biography}
									</Typography>
								</Stack>
							</Box>
						</Box>
						<Container header='medias'>
							<PersonMediaGrid personId={personId} />
						</Container>
					</Box>
				</>
			)}
		</>
	);
};

export default CastPage;
