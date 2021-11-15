import React from 'react'
import styles from './PlaceOrder.module.css'
import { CheckOutCard, PaymentForm } from '../../components'
import { Row, Col } from 'antd'
import { MainLayout } from '../../layouts/mainLayout'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { placeOrder, placeOrderSlice } from '../../redux/order/slice'


export const PlaceOrder: React.FC = () => {
	const loading = useSelector(s=>s.placeOrder.loading)
	const currentOrder = useSelector(s=>s.placeOrder.currentOrder)
	const jwt = useSelector(s=>s.user.token) as string
	
	const dispatch = useDispatch();
	const history = useHistory(); 

	return (
		<MainLayout>
			<Row>
				<Col span={12}>
					<PaymentForm />
				</Col>
				<Col span={12}>
					<CheckOutCard 
						loading={loading}
						order={currentOrder}
						onCheckout={()=>{
							dispatch(placeOrder({jwt, orderId: currentOrder.id}))
						}}
					/>
				</Col>
			</Row>
		</MainLayout>
	)
}