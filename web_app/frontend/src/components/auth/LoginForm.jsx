import './LoginStyle.css';

import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/features/authSlice';
import { useLoginMutation } from '../../redux/features/authApiSlice';

const LoginForm = () => {
	const userRef = useRef();
	const errRef = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const accessToken = await login({ email, password }).unwrap();
			dispatch(setCredentials({ email, accessToken }));
			setEmail('');
			setPassword('');
			navigate('/homePage');
		} catch (err) {
			setErrMsg(err.data.detail);
			errRef.current.focus();
		}
	};

	const handleEmailInput = (e) => setEmail(e.target.value);

	const handlePasswordInput = (e) => setPassword(e.target.value);

	return isLoading ? (
		<h1 color='#fff'>Loading...</h1>
	) : (
		<>
			<section className='login'>
				<p
					ref={errRef}
					className={errMsg ? 'errmsg' : 'offscreen'}
					aria-live='assertive'
				>
					{errMsg}
				</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						id='email'
						ref={userRef}
						value={email}
						onChange={handleEmailInput}
						autoComplete='off'
						required
					/>

					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						onChange={handlePasswordInput}
						value={password}
						required
					/>
					<button>Sign In</button>
				</form>

				<footer>
					<Link to='/'>Don't have an account?</Link>
				</footer>
			</section>
		</>
	);
};

export default LoginForm;
