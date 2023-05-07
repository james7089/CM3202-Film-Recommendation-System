import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, TextField, Toolbar } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useLazySearchQuery } from '../redux/features/searchApiSlice';
import ResultsGrid from '../components/common/ResultsGrid.jsx';
import uiConfigs from '../configs/ui.configs';

const mediaTypes = ['movie', 'person'];
let timer;
const timeout = 500;

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [onSearch, setOnSearch] = useState(false);
	const [mediaType, setMediaType] = useState(mediaTypes[0]);
	const [medias, setMedias] = useState([]);
	const [page, setPage] = useState(1);

	const [fetchResults] = useLazySearchQuery();

	const search = useCallback(async () => {
		setOnSearch(true);

		const response = await fetchResults({
			mediaType,
			query,
			page,
		});

		setOnSearch(false);
		if (response) {
			if (page > 1) setMedias((m) => [...m, ...response.data.results]);
			else setMedias([...response.data.results]);
		}
	}, [mediaType, query, page, fetchResults]);

	useEffect(() => {
		if (query.trim().length === 0) {
			setMedias([]);
			setPage(1);
		} else search();
	}, [search, query, mediaType, page]);

	useEffect(() => {
		setMedias([]);
		setPage(1);
	}, [mediaType]);

	const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

	const onQueryChange = (e) => {
		const newQuery = e.target.value;
		clearTimeout(timer);

		timer = setTimeout(() => {
			setQuery(newQuery);
		}, timeout);
	};

	return (
		<>
			<Toolbar />
			<Box sx={{ ...uiConfigs.style.mainContent }}>
				<Stack spacing={2}>
					<Stack
						spacing={2}
						direction='row'
						justifyContent='center'
						sx={{ width: '100%' }}
					>
						{mediaTypes.map((item, index) => (
							<Button
								size='large'
								key={index}
								variant={mediaType === item ? 'contained' : 'text'}
								sx={{
									color:
										mediaType === item ? 'primary.contrastText' : '#7393B3',
									backgroundColor:
										mediaType === item ? '#7393B3' : '',
								}}
								onClick={() => onCategoryChange(item)}
							>
								{item}
							</Button>
						))}
					</Stack>
					<TextField
						placeholder='Search'
						sx={{
							width: '100%',
							input: {
								background: '#fff',
							},
						}}
						autoFocus
						onChange={onQueryChange}
					/>

					<ResultsGrid medias={medias} mediaType={mediaType} />

					{medias.length > 0 && (
						<LoadingButton sx={{color:'#fff'}} loading={onSearch} onClick={() => setPage(page + 1)}>
							load more
						</LoadingButton>
					)}
				</Stack>
			</Box>
		</>
	);
};

export default SearchPage;
