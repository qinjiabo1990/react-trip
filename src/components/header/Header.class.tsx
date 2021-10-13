import React from 'react'
import styles from './header.module.css'
import 'antd/dist/antd.css';
import logo from '../../assets/images/logo.svg'
import { Layout, Typography, Dropdown, Button, Menu, Input } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import store, {RootState} from '../../redux/store'
import { LanguageState } from '../../redux/language/languageReducer'
import { withTranslation, WithTranslation } from 'react-i18next';
import { changeLanguageAction, addLanguageAction } from '../../redux/language/languageActions'
import {connect} from 'react-redux'

import {Dispatch} from 'redux'

// interface State extends LanguageState {}
const mapStateToProps = (state:RootState) => {
	return {
		language: state.language.language,
		languageList: state.language.languageList
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		addLanguage: (name: string, code: string) => {
			const action = addLanguageAction(name, code)
			dispatch(action)
		},
		changeLanguage: (languageCode: 'zh' | 'en') => {
			const action = changeLanguageAction(languageCode)
			dispatch(action)
		}
	}
}

class HeaderComponent extends React.Component<RouteComponentProps & 
WithTranslation & 
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>> {

	// handlerStateChange = () => {
	// 	this.setState(store.getState());
	// }

	menuClickHandler = (e: any) => {
		if(e.key === 'new') {
			this.props.addLanguage("new_language", "new language")
		}
		else {
			this.props.changeLanguage(e.key)
		}
	}

	render() {
		const { history, t } = this.props
		return (
			<div className={styles.appHeader}>
				<div className={styles.topHeader}>
					<div className={styles.inner}>
						<Typography.Text>{t('header.slogan')}</Typography.Text>
						<Dropdown.Button
							style={{ marginLeft: 15 }}
							overlay={
								<Menu onClick={this.menuClickHandler}>
									{this.props.languageList.map((e) => (
										<Menu.Item key={e.code}>{e.name}</Menu.Item>
									))}
									<Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
								</Menu>
							}
							icon={<GlobalOutlined />}
						>{this.props.language === 'zh' ? "中文" : "English"}
						</Dropdown.Button>
						<Button.Group className={styles.buttonGroup}>
							<Button onClick={() => history.push('/signup')}>{t('header.register')}</Button>
							<Button onClick={() => history.push('/signin')}>{t('header.signin')}</Button>
						</Button.Group>
					</div>
				</div>
				<Layout.Header className={styles.mainHeader}>
					<img src={logo} alt="logo" className={styles['App-logo']} />
					<Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
					<Input.Search className={styles.searchInput} placeholder="input search text" />
				</Layout.Header>
				<Menu mode={'horizontal'} className={styles.mainMenu}>
					<Menu.Item key='1' onClick={() => history.push('')}>{t('header.home_page')}</Menu.Item>
					<Menu.Item key='2'>{t('header.weekend')}</Menu.Item>
					<Menu.Item key='3'>{t('header.group')}</Menu.Item>
					<Menu.Item key='4'>{t('header.backpack')}</Menu.Item>
					<Menu.Item key='5'>{t('header.cruise')}</Menu.Item>
					<Menu.Item key='6'>{t('header.local')}</Menu.Item>
					<Menu.Item key='7'>{t('header.visa')}</Menu.Item>
				</Menu>
			</div>
		)
	}
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));