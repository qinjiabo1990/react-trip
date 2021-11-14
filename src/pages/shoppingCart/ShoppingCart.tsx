import React from 'react'
import styles from './ShoppingCart.module.css'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'
import { MainLayout } from '../../layouts/mainLayout'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { addShoppingCart, clearShoppingCart } from '../../redux/shoppingCart/slice'



export const ShoppingCart: React.FC = () => {
	// loading items jwt
	const dispatch = useDispatch();
	const shoppingCartLoading = useSelector(s=>s.shoppingCart.loading)
	const jwt = useSelector(s=>s.user.token) as string
	const items = useSelector(s=>s.shoppingCart.items)

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
							originalPrice={items.map(i => i.originalPrice).reduce((a,b)=> (a+b),0)}
							price={items.map(i=>(i.originalPrice * (i.discountPresent || 1))).reduce((a,b)=> (a+b),0)}
							onCheckout={() => { }}
							onShoppingCartClear={
								()=> dispatch(clearShoppingCart({jwt, itemIds: items.map((s)=>s.id)}))
							}
						/>
					</Affix>
				</div>
			</Col>
		</Row>
	</MainLayout>
}