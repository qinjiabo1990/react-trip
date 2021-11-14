import React from 'react'
import styles from './ShoppingCart.module.css'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { addShoppingCart, clearShoppingCart } from '../../redux/shoppingCart/slice'



export const ShoppingCart: React.FC = () => {
	const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)
	const items = useSelector(s => s.shoppingCart.items)
	const jwt = useSelector(s => s.user.token) as string
	const dispatch = useDispatch()

	return <MainLayout>
		<Row>
			{/* Shopping Cart List */}
			<Col span={16}>
				<div className={styles.productListContainer}>
					<ProductList
						data={items.map(s => s.touristRoute)}
					/>
				</div>
			</Col>
			{/* Payment */}
			<Col span={8}>
				<div className={styles.paymentCardContainer}>
					<Affix>
						<PaymentCard
							loading={shoppingCartLoading}
							originalPrice={items.map(s => s.originalPrice).reduce((a, b) => a + b, 0)}
							price={items.map(s => s.originalPrice * (s.discountPresent ? s.discountPresent : 1)).reduce((a, b) => a + b, 0)}
							onCheckout={() => { }}
							onShoppingCartClear={() => {
								dispatch(clearShoppingCart({ jwt, itemIds: items.map(s => s.id)}))
							}}
						/>
					</Affix>
				</div>
			</Col>
		</Row>
	</MainLayout>
}