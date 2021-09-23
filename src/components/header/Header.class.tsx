import React from 'react'
import styles from './header.module.css'
import 'antd/dist/antd.css';
import logo from '../../assets/images/logo.svg'
import { Layout, Typography, Dropdown, Button, Menu, Input } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import store from '../../redux/store'
import { LanguageState } from '../../redux/languageReducer'

interface State extends LanguageState {}

class HeaderComponent extends React.Component<RouteComponentProps, State> {
	constructor(props: any) {
		super(props);
		this.state = store.getState();
		store.subscribe(this.handlerStateChange);
	}

	handlerStateChange = () => {
		this.setState(store.getState());
	}

	menuClickHandler = (e: any) => {
		const action = {
			type: 'change_language',
			payload: e.key,
		}
		store.dispatch(action);
	}

	render() {
		const { history } = this.props
		return (
			<div className={styles.appHeader}>
				<div className={styles.topHeader}>
					<div className={styles.inner}>
						<Typography.Text>Make travel happier</Typography.Text>
						<Dropdown.Button
							style={{ marginLeft: 15 }}
							overlay={
								<Menu onClick={this.menuClickHandler}>
									{this.state.languageList.map((e) => (
										<Menu.Item key={e.code}>{e.name}</Menu.Item>
									))}
								</Menu>
							}
							icon={<GlobalOutlined />}
						>{this.state.language === 'zh' ? "中文" : "English"}
						</Dropdown.Button>
						<Button.Group className={styles.buttonGroup}>
							<Button onClick={() => history.push('/signup')}>Register</Button>
							<Button onClick={() => history.push('/signin')}>Sign In</Button>
						</Button.Group>
					</div>
				</div>
				<Layout.Header className={styles.mainHeader}>
					<img src={logo} alt="logo" className={styles['App-logo']} />
					<Typography.Title level={3} className={styles.title}>React Trip</Typography.Title>
					<Input.Search className={styles.searchInput} placeholder="input search text" />
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
}

export const Header = withRouter(HeaderComponent);