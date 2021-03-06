import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import 'antd/dist/antd.css';
import logo from '../../assets/images/logo.svg'
import { Layout, Typography, Dropdown, Button, Menu, Input } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux'
import { addLanguageAction, changeLanguageAction } from '../../redux/language/languageActions';
import { useTranslation } from 'react-i18next';
import jwt_decode from 'jwt-decode'
import { userSlice } from '../../redux/user/slice';

export const Header: React.FC = () => {
	const history = useHistory();
	const location = useLocation();
	const params = useParams();
	const match = useRouteMatch();

	const language = useSelector(state => state.language.language)
	const languageList = useSelector(state => state.language.languageList)
	const dispatch = useDispatch()

	const { t } = useTranslation();

	const jwt = useSelector(s => s.user.token)
	const [username, setUserName] = useState('')

	const signOut = () => {
		dispatch(userSlice.actions.signOut())
		history.push('/')
	}

	// loading and items
	const shoppingCartLoading = useSelector(s=> s.shoppingCart.loading)
	const shoppingCartItems = useSelector(s=>s.shoppingCart.items)

	useEffect(() => {
		if (jwt) {
			const token: any = jwt_decode(jwt)
			setUserName(token.username)
		}
	}, [jwt])

	const menuClickHandler = (e: any) => {
		if (e.key === 'new') {
			dispatch(addLanguageAction('new_language', 'new language'))
		}
		else {
			dispatch(changeLanguageAction(e.key))
		}
	}

	return (
		<div className={styles.appHeader}>
			<div className={styles.topHeader}>
				<div className={styles.inner}>
					<Typography.Text>{t('header.slogan')}</Typography.Text>
					<Dropdown.Button
						style={{ marginLeft: 15 }}
						overlay={
							<Menu onClick={menuClickHandler}>
								{languageList.map((e) => (
									<Menu.Item key={e.code}>{e.name}</Menu.Item>
								))}
								<Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
							</Menu>
						}
						icon={<GlobalOutlined />}
					>{language === 'zh' ? "??????" : "English"}
					</Dropdown.Button>
					{jwt ? (
						<Button.Group className={styles.buttonGroup}>
							<span>
								{t('header.welcome')}
								<Typography.Text strong>{username}</Typography.Text>
							</span>
							<Button loading={shoppingCartLoading} onClick={() => history.push('/shoppingCart')}>{t('header.shoppingCart')} ({shoppingCartItems.length})</Button>
							<Button onClick={signOut} >{t('header.signOut')}</Button>
						</Button.Group>
					) : (
						<Button.Group className={styles.buttonGroup}>
							<Button onClick={() => history.push('/signup')}>Register</Button>
							<Link to='/signin'><Button>Signin</Button></Link>
						</Button.Group>
					)}
				</div>
			</div>
			<Layout.Header className={styles.mainHeader}>
				<img src={logo} alt="logo" className={styles['App-logo']} />
				<Typography.Title level={3} className={styles.title}>React Trip</Typography.Title>
				<Input.Search className={styles.searchInput} placeholder="input search text" onSearch={(keyword) => history.push('/search/' + keyword)} />
			</Layout.Header>
			<Menu mode={'horizontal'} className={styles.mainMenu}>
				<Menu.Item key='1' onClick={() => history.push('')}>Home</Menu.Item>
				<Menu.Item key='2'>Weekend</Menu.Item>
				<Menu.Item key='3'>Group</Menu.Item>
				<Menu.Item key='4'>Backpack</Menu.Item>
				<Menu.Item key='5'>Cruise</Menu.Item>
				<Menu.Item key='6'>Local</Menu.Item>
				<Menu.Item key='7'>Visa</Menu.Item>
			</Menu>
		</div>
	)
}