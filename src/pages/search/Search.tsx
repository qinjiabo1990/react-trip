import React, { useEffect } from 'react'
import styles from './Search.module.css'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { useSelector } from '../../redux/hooks'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { getProductSearch } from '../../redux/productSearch/slice'
import { MainLayout } from '../../layouts/mainLayout'

interface ParamsType {
	keyword: string
}

export const Search: React.FC = () => {
	
	const {keyword} = useParams<ParamsType>();

	const loading = useSelector(state => state.productSearch.loading)
	const product = useSelector(state => state.productSearch.data)
	const error = useSelector(state => state.productSearch.error)
	const pagination = useSelector(state => state.productSearch.pagination)

	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		dispatch(getProductSearch({keyword, nextPage: 1, pageSize: 5}))
	},[location])

	const onPageChange = (nextPage, pageSize) => {
		dispatch(getProductSearch({keyword, nextPage, pageSize}))
	}
	
	if(error){
		return <div>{error}</div>
	}

	if(loading){
		return <div><Spin /></div>
	}

	return (
		<MainLayout>
				{/* Filter */}
				<div className={styles['product-list-container']}>
					<FilterArea />
				</div>
				{/* Product List */}
				<div className={styles['product-list-container']}>
					<ProductList 
						data={product}
						paging={pagination}
						onPageChange={onPageChange}
					/>
				</div>
		</MainLayout>
	)
}