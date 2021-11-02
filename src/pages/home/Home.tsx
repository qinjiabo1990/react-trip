import React from 'react';
import styles from './Home.module.css';
import { Row, Col, Spin } from 'antd';
import { Header, SideMenu, Carousel, Footer, Product } from '../../components';
import sideImage from '../../assets/images/sider_2019_12-09.png'
import { withTranslation, WithTranslation } from 'react-i18next';
import axios from 'axios'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store';
import {
	giveMeDataAction
} from '../../redux/recommendProducts/RecommendProductsActions';
import { MainLayout } from '../../layouts/mainLayout';

const mapStateToProps = (state: RootState) => {
	return {
		productList: state.recommendProducts.productList,
		error: state.recommendProducts.error,
		loading: state.recommendProducts.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		giveMeData: () => {
			dispatch(giveMeDataAction())
		}
	}
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePage extends React.Component<PropsType> {
	componentDidMount() {
		this.props.giveMeData();
	}

	render() {
		const { t } = this.props;
		const { productList, loading, error } = this.props
		if (loading) {
			return <Spin />
		}
		if (error) {
			return <div>{error}</div>
		}
		return (
			<MainLayout>
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
					products={productList[0].touristRoutes}
				/>
			</MainLayout>
		)
	}
}
export const Home = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePage));