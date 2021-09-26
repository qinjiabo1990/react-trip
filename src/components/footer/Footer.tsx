import React from 'react';
import styles from './Footer.module.css'
import { Layout, Typography } from "antd";
import { useTranslation } from 'react-i18next';

export const Footer : React.FC = () => {
	const {t} = useTranslation();
  return (
    <Layout.Footer>
      <Typography.Title level={3} className={styles.footer}>
        {t('footer.detail')} <a href="https://www.bobqin.com" target='_blank'>QinTech.com</a>
      </Typography.Title>
    </Layout.Footer>
  )
}