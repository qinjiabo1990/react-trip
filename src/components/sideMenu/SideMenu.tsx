import React from 'react'
import { Menu } from 'antd';
import uniqid from 'uniqid';
import styles from './SideMenu.module.css'
import {sideMenuList} from './mockup'

export const SideMenu : React.FC = () => {
  return (
    <Menu className={styles.sideMenu} mode="vertical">
      {sideMenuList.map((data)=>(
        <Menu.SubMenu key={uniqid()} title={data.title}>
          {data.subMenu.map((d)=>(
            <Menu.SubMenu key={uniqid()} title={d.title}>
            {d.subMenu.map((r)=>(
              <Menu.Item key={uniqid()}>{r}</Menu.Item>
            ))}
          </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}