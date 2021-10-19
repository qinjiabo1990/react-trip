import React from 'react'
import styles from './productComments.module.css'
import { Comment, Tooltip, List } from 'antd';

interface CommentsType {
	data:{
		author: string,
		avatar: string,
		content: string,
		createDate: string,
	}[];
}

export const ProductComments: React.FC<CommentsType> = ({data}) => {
	return (
		<List
			dataSource={data}
			itemLayout="horizontal"
			renderItem={item => (
				<li>
					<Comment
						author={item.author}
						avatar={item.avatar}
						content={item.content}
						datetime={item.createDate}
					/>
				</li>
			)}
		></List>
	)
}