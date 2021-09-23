import React from 'react'
import styles from './header.module.css'
import 'antd/dist/antd.css';
import logo from '../../assets/images/logo.svg'
import { Layout, Typography, Dropdown, Button, Menu, Input } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

export const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();

  return (
    <div className={styles.appHeader}>
      <div className={styles.topHeader}>
        <div className={styles.inner}>
          <Typography.Text>Make travel happier</Typography.Text>
          <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu>
                  {/* {languageList.map(data => {
                    return <Menu.Item key={data.code}>{data.name}</Menu.Item>
                  })} */}
                  <Menu.Item key={"1"}>中文</Menu.Item>
                  <Menu.Item key={"2"}>English</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >语言
            </Dropdown.Button>
            <Button.Group className={styles.buttonGroup}>
              <Button onClick={()=>history.push('signup')}>Register</Button>
              <Link to='/signin'><Button>Signin</Button></Link>
            </Button.Group>
        </div>
      </div>
      <Layout.Header className={styles.mainHeader}>
      <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>React Trip</Typography.Title>
          <Input.Search className={styles.searchInput} placeholder="input search text" />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles.mainMenu}>
        <Menu.Item key='1' onClick={()=>history.push('')}>Home</Menu.Item>
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