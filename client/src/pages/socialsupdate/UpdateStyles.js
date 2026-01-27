import styled from 'styled-components';

export const Container = styled.div`
	max-width: 600px;
	margin: 80px auto 0;
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled.h1`
	text-align: center;
	color: #333;
	margin-bottom: 30px;
	font-size: 2rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FormGroup = styled.div`
	margin-bottom: 20px;
`;

export const Label = styled.label`
	display: block;
	margin-bottom: 8px;
	font-weight: bold;
	color: #555;
`;

export const Input = styled.input`
	width: 100%;
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1rem;
	box-sizing: border-box;

	&:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
	}

	&[type='password'] {
		font-family: 'Courier New', monospace;
	}
`;

export const Button = styled.button`
	padding: 12px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;

export const Message = styled.p`
	margin-top: 20px;
	padding: 10px;
	border-radius: 4px;
	text-align: center;
	font-weight: bold;

	&.success {
		background-color: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	&.error {
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}
`;
