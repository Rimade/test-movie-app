import React from 'react'
import styles from './NotFoundBlock.module.scss'
import Header from '../components/Header'

console.log(styles)

const NotFound = () => {
	return (
		<>
			<div className="header-content centering">
				<Header />
			</div>
			<div className={styles.root}>
				<h1>
					<span>😕</span>
					<br />
					Ничего не найдено
				</h1>
				<p className={styles.description}>
					К сожалению данная страница отстутствует
				</p>
			</div>
		</>
	)
}

export default NotFound
