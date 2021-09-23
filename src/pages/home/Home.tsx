import React from 'react';
import styles from './Home.module.css';
import { Row, Col } from 'antd';
import { Header, SideMenu, Carousel, Footer, Product } from '../../components';
import sideImage from '../../assets/images/sider_2019_12-09.png'
import {productList1} from './mockups'

export const Home: React.FC = () => {
	return (
		<>
			<Header />
			<Row className={styles.homeBody}>
				<Col xs={6}>
					<SideMenu />
				</Col>
				<Col xs={18}>
					<Carousel />
				</Col>
			</Row>
			<Product 
				title={<h2>Hot Recommended</h2>}
				source={sideImage}
				products={productList1}
			/>
			<Footer />
		</>
	)
}