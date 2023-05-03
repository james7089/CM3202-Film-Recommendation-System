import './LoginStyle.css';

import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '../../redux/features/authApiSlice';

const RegisterForm = () => {
	const userRef = useRef();
	const errRef = useRef();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await register({ email, password }).unwrap();
			setEmail('');
			setPassword('');
			navigate('/loginPage');
		} catch (err) {
			setErrMsg(err.data.detail);
			errRef.current.focus();
		}
	};

	const handleEmailInput = (e) => setEmail(e.target.value);

	const handlePasswordInput = (e) => setPassword(e.target.value);

	return isLoading ? (
		<h1>Loading...</h1>
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
					<button>Register</button>
				</form>

				<footer>
					<Link to='/loginPage'>Already have an account?</Link>
				</footer>
			</section>
		</>
	);
};

export default RegisterForm;
