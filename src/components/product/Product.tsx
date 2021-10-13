import React from 'react'
import styles from './Product.module.css'
import { Row, Col, Divider } from 'antd'
import { ProductImages } from './ProductImages'


interface ProductTyoes {
	title: JSX.Element;
	source: string;
	products: any[]
}

export const Product: React.FC<ProductTyoes> = ({ title, source, products }) => {
	return (
		<div className={styles.productBody}>
			<Divider orientation='left'>{title}</Divider>
			<Row>
				<Col xs={4}>
					<img src={source} className={styles.productPromotion} alt="product" />
				</Col>
				<Col xs={20}>
					<Row>
						<Col xs={12}>
							<ProductImages
								id={products[0].id}
								size={"large"}
								title={products[0].title}
								source={products[0].touristRoutePictures[0].url}
								price={products[0].price}
							/>
						</Col>
						<Col xs={12}>
							<Row>
								<Col xs={12}>
									<ProductImages
										size={'small'}
										id={products[1].id}
										title={products[1].title}
										source={products[1].touristRoutePictures[0].url}
										price={products[1].price}
									/>
								</Col>
								<Col xs={12}>
									<ProductImages
										size={'small'}
										id={products[2].id}
										title={products[2].title}
										source={products[2].touristRoutePictures[0].url}
										price={products[2].price}
									/>
								</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<ProductImages
										size={'small'}
										id={products[3].id}
										title={products[3].title}
										source={products[3].touristRoutePictures[0].url}
										price={products[3].price}
									/>
								</Col>
								<Col xs={12}>
									<ProductImages
										size={'small'}
										id={products[4].id}
										title={products[4].title}
										source={products[4].touristRoutePictures[0].url}
										price={products[4].price}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<ProductImages
								size={'small'}
								id={products[5].id}
								title={products[5].title}
								source={products[5].touristRoutePictures[0].url}
								price={products[5].price}
							/>
						</Col>
						<Col xs={6}>
							<ProductImages
								size={'small'}
								id={products[6].id}
								title={products[6].title}
								source={products[6].touristRoutePictures[0].url}
								price={products[6].price}
							/>
						</Col>
						<Col xs={6}>
							<ProductImages
								size={'small'}
								id={products[7].id}
								title={products[7].title}
								source={products[7].touristRoutePictures[0].url}
								price={products[7].price}
							/>
						</Col>
						<Col xs={6}>
							<ProductImages
								size={'small'}
								id={products[8].id}
								title={products[8].title}
								source={products[8].touristRoutePictures[0].url}
								price={products[8].price}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}