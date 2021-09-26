import React from 'react';
import styles from './Home.module.css';
import { Row, Col } from 'antd';
import { Header, SideMenu, Carousel, Footer, Product } from '../../components';
import sideImage from '../../assets/images/sider_2019_12-09.png'
import { productList1 } from './mockups'
import { withTranslation, WithTranslation } from 'react-i18next';

class HomePage extends React.Component<WithTranslation> {
	render() {
		const {t} = this.props;
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
					title={<h2>{t('home_page.hot_recommended')}</h2>}
					source={sideImage}
					products={productList1}
				/>
				<Footer />
			</>
		)
	}
}
export const Home = withTranslation()(HomePage);