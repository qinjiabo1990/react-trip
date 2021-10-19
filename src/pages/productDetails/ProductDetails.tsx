import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import { RouteComponentProps, useParams } from 'react-router'
import axios from 'axios'
import { Row, Col, Spin, DatePicker, Space, Divider, Typography, Anchor, Menu } from 'antd';
import { Header, Footer, ProductIntro, ProductComments } from '../../components/'
import { commentMockData } from './mockup'
import {useSelector} from '../../redux/hooks'
import {useDispatch} from 'react-redux'
import {productDetailSlice} from '../../redux/productDetail/slice'

interface ProductDetailsType {
	tourDetailsId: string;
}

export const ProductDetails: React.FC<RouteComponentProps<ProductDetailsType>> = () => {
	const { tourDetailsId } = useParams<ProductDetailsType>()
	// const [loading, setLoading] = useState<boolean>(true)
	// const [product, setProduct] = useState<any>(null)
	// const [error, setError] = useState<string | null>(null)

	const loading = useSelector((state)=> state.productDetail.loading)
	const error = useSelector((state) => state.productDetail.error)
	const product = useSelector((state) => state.productDetail.data)

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			dispatch(productDetailSlice.actions.fetchStart());
			try {
				const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${tourDetailsId}`)
				dispatch(productDetailSlice.actions.fetchSuccess(data))
			} catch (error) {
				dispatch(productDetailSlice.actions.fetchFail(error.message()))
			}
		}
		fetchData()
	}, [])

	if (loading) {
		return <Spin />
	}
	if (error) {
		return <div>{error}</div>
	}

	const { RangePicker } = DatePicker;

	return (
		<>
			<Header />
			<div className={styles["page-content"]}>
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
			</div>
			<Footer />
		</>
	)
}