import React from 'react'
import styles from './Product.module.css'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { Image } from 'antd'

interface productImageType {
	id: string | number;
	size: "large" | 'small';
	source: string;
	title: string;
	price: string | number;
}

export const ProductImages: React.FC<productImageType> = ({id, size, source, title, price}) => {
	return (
		<Link target={'_blank'} to={`/details/${id}&${title}`}>
		{size === 'large' ? (
			<Image preview={false} src={source} alt="tour" height={285} width={490} />
		) : (<Image preview={false} src={source} alt="tour" height={120} width={240} />)}
			<p>{title} <span className={styles.price}>From ${price}</span></p>
		</Link>
	)
}
