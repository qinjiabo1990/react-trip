import React from 'react';
import styles from './Footer.module.css'
import { Layout, Typography } from "antd";

export const Footer : React.FC = () => {
  return (
    <Layout.Footer>
      <Typography.Title level={3} className={styles.footer}>
        All rights reserved @ <a href="https://www.bobqin.com" target='_blank'>QinTech.com</a>
      </Typography.Title>
    </Layout.Footer>
  )
}