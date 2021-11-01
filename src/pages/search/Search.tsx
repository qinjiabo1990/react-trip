import React, { useEffect } from 'react'
import styles from './Search.module.css'
import { Header, Footer, FilterArea, ProductList } from '../../components'
import { useSelector } from '../../redux/hooks'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { getProductSearch } from '../../redux/productSearch/slice'

interface MatchParams {
	keywords: string
}

export const Search: React.FC = () => {
	const {keywords} = useParams<MatchParams>();

	const productList = useSelector( state => state.productSearch.data)
	const	pagination = useSelector( state => state.productSearch.pagination)
	const error = useSelector( state => state.productSearch.error)
	const loading = useSelector( state => state.productSearch.loading)

	const dispatch = useDispatch()
	const location = useLocation();

	useEffect(() => {
		dispatch(getProductSearch({keywords, nextPage: 1, pageSize: 10}))
	},[location])

	const onPageChange = (nextPage, pageSize) => {
		dispatch(getProductSearch({keywords, nextPage, pageSize}))
	}

	if(error) {
		return <div>{error}</div>
	}

	if(loading) {
		return <Spin />
	}

	return (
		<>
			<Header />
			<div className={styles['page-content']}>
				{/* Filter */}
				<div className={styles['product-list-container']}>
					<FilterArea />
				</div>
				{/* Product List */}
				<div className={styles['product-list-container']}>
					<ProductList 
						data={productList}
						paging={pagination}
						onPageChange={onPageChange}
					/>
				</div>
			</div>
			<Footer />
		</>
	)
}