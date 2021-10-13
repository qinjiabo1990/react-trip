import React from 'react';
import styles from './Home.module.css';
import { Row, Col, Spin } from 'antd';
import { Header, SideMenu, Carousel, Footer, Product } from '../../components';
import sideImage from '../../assets/images/sider_2019_12-09.png'
import { withTranslation, WithTranslation } from 'react-i18next';
import axios from 'axios'
import {connect} from 'react-redux'
import { RootState } from '../../redux/store';
import { Dispatch } from 'redux';
import { fetchRecommendProductFailActionCreator, fetchRecommendProductStateActionCreator, fetchRecommendProductSuccessStateActionCreator } from '../../redux/recommendProducts/RecommendProductsActions';

const mapStateToProps = (state:RootState) => {
	return {
		loading: state.recommendProduct.loading,
		productList: state.recommendProduct.productList,
		error: state.recommendProduct.error
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		fetchStart: () => {
			const action = fetchRecommendProductStateActionCreator();
			dispatch(action)
		},
		fetchSuccess: (data) => {dispatch(fetchRecommendProductSuccessStateActionCreator(data))},
		fetchFail: (error) => {dispatch(fetchRecommendProductFailActionCreator(error))},
	}
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>


class HomePage extends React.Component<PropsType> {

	async componentDidMount() {
		this.props.fetchStart()
		try {
			const {data} = await axios.get<any>('http://123.56.149.216:8080/api/productCollections');
			this.props.fetchSuccess(data);
		} catch (error) {
			this.props.fetchFail(error.message)
		}
	}

	render() {
		const {t} = this.props;
		const {productList, loading, error} = this.props
		if (loading){
			return <Spin />
		}
		if (error) {
			return <div>{error}</div>
		}
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
					products={productList[0].touristRoutes}
				/>
				<Footer />
			</>
		)
	}
}
export const Home = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HomePage));