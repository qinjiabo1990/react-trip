import React from 'react';
import styles from './ProductDetails.module.css'
import { RouteComponentProps } from 'react-router'

interface ProductDetailsType {
	tourDetailsId: string;
	title: string;
}

export const ProductDetails: React.FC<RouteComponentProps<ProductDetailsType>> = (props) => {
	console.log(props)
	return (
		<>
			<h2>You are watching {props.match.params.tourDetailsId}</h2>
			<p>{props.match.params.title}</p>
		</>
	)
}