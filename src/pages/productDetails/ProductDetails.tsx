import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import { RouteComponentProps, useParams } from 'react-router'
import axios from 'axios'
import { Row, Col, Spin, DatePicker, Space, Divider, Typography, Anchor, Menu, Button } from 'antd';
import { Header, Footer, ProductIntro, ProductComments } from '../../components/'
import { commentMockData } from './mockup'
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { getProductDetail } from '../../redux/productDetail/slice'
import { MainLayout } from '../../layouts/mainLayout';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addShoppingCart } from '../../redux/shoppingCart/slice';


interface ProductDetailsType {
	tourDetailsId: string;
}

export const ProductDetails: React.FC<RouteComponentProps<ProductDetailsType>> = () => {
	const { tourDetailsId } = useParams<ProductDetailsType>()
	// const [loading, setLoading] = useState<boolean>(true)
	// const [product, setProduct] = useState<any>(null)
	// const [error, setError] = useState<string | null>(null)

	const loading = useSelector(state => state.productDetail.loading);
	const product = useSelector(state => state.productDetail.product);
	const error = useSelector(state => state.productDetail.error);

	//jwt and loading
	const jwt = useSelector(s=>s.user.token) as string
	const shoppingCartLoading = useSelector(s=>s.shoppingCart.loading)

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductDetail(tourDetailsId));
	}, [])

	if (loading) {
		return <Spin />
	}
	if (error) {
		return <div>{error}</div>
	}

	const { RangePicker } = DatePicker;

	return (
		<MainLayout>
			{/* 产品简介 与 日期选择 */}
			<div className={styles["product-intro-container"]}>
				<Row>
					<Col span={13}>
						<ProductIntro
							title={product.title}
							shortDescription={product.description}
							price={product.originalPrice}
							coupons={product.coupons}
							points={product.points}
							discount={product.price}
							rating={product.rating}
							pictures={product.touristRoutePictures.map((p) => p.url)}
						/>
					</Col>
					<Col span={11}>
						<Space direction="vertical" size={12}>
							<Button 
								loading={shoppingCartLoading} 
								style={{marginTop: 50, marginBottom: 30, display:'block'}}
								type='primary'
								danger
								onClick={()=>dispatch(addShoppingCart({jwt, touristRouteId: product.id}))}
							>
								<ShoppingCartOutlined />Add to Cart
							</Button>
							<RangePicker open style={{ marginTop: 20 }} />
						</Space>
					</Col>
				</Row>
			</div>
			{/* 锚点菜单 */}
			<Anchor className={styles["product-detail-anchor"]}>
				<Menu mode="horizontal">
					<Menu.Item key="1">
						<Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Anchor.Link href="#fees" title="费用"></Anchor.Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
					</Menu.Item>
					<Menu.Item key="5">
						<Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
					</Menu.Item>
				</Menu>
			</Anchor>
			{/* Features */}
			<div id="feature" className={styles["product-detail-container"]}>
				<Divider orientation={'center'}>
					<Typography.Title level={3}>Features</Typography.Title>
				</Divider>
				<div
					dangerouslySetInnerHTML={{ __html: product.features }}
					style={{ margin: 50 }}
				></div>
			</div>
			{/* 费用 */}
			<div id="fees" className={styles["product-detail-container"]}>
				<Divider orientation={'center'}>
					<Typography.Title level={3}>Price</Typography.Title>
				</Divider>
				<div
					dangerouslySetInnerHTML={{ __html: product.fees }}
					style={{ margin: 50 }}
				></div>
			</div>
			{/* 预订须知 */}
			<div id="notes" className={styles["product-detail-container"]}>
				<Divider orientation={'center'}>
					<Typography.Title level={3}>Notes</Typography.Title>
				</Divider>
				<div
					dangerouslySetInnerHTML={{ __html: product.notes }}
					style={{ margin: 50 }}
				></div>
			</div>
			{/* 商品评价*/}
			<div id="comments" className={styles["product-detail-container"]}>
				<Divider orientation={'center'}>
					<Typography.Title level={3}>Comments</Typography.Title>
				</Divider>
				<div style={{ margin: 40 }}>
					<ProductComments
						data={commentMockData} />
				</div>
			</div>
		</MainLayout>
	)
}