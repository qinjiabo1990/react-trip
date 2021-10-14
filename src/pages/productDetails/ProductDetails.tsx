import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import { RouteComponentProps, useParams } from 'react-router'
import axios from 'axios'
import { async } from 'q';
import { Row, Col, Spin, DatePicker, Space } from 'antd';
import {Header, Footer, ProductIntro} from '../../components/'

interface ProductDetailsType {
	tourDetailsId: string;
}

export const ProductDetails: React.FC<RouteComponentProps<ProductDetailsType>> = () => {
	const { tourDetailsId } = useParams<ProductDetailsType>();
	const [loading, setLoading] = useState<boolean>(true);
	const [product, setProduct] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${tourDetailsId}`);
				setProduct(data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false)
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
								pictures={product.touristRoutePictures.map((p)=>p.url)}
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
				<div className={styles["product-detail-anchor"]}></div>
				{/* 产品特色 */}
				<div id="feature" className={styles["product-detail-container"]}></div>
				{/* 费用 */}
				<div id="fees" className={styles["product-detail-container"]}></div>
				{/* 预订须知 */}
				<div id="notes" className={styles["product-detail-container"]}></div>
				{/* 商品评价*/}
				<div id="comments" className={styles["product-detail-container"]}></div>
			</div>
			<Footer />
		</>
	)
}