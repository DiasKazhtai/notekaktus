import React from 'react'
import styles from './headerMenu.module.scss'

export default function header({modal}) {
    return (
        <div className={styles.container} style={{ position: modal ? 'static' : 'absolute' }}>
            <div 
                className={styles.container__title}
                style={{ display: modal ? 'none' : 'flex' }}
            >
                <div className={styles.container__btns__item}>
                    Title
                </div>
            </div>
            <div className={styles.container__empty}></div>
            <div className={styles.container__btns}>
                <div className={styles.container__btns__item}>Share</div>
                <div className={styles.container__btns__item}>Updates</div>
                <div className={styles.container__btns__item}>Favorite</div>
                <div className={styles.container__btns__item}>...</div>
            </div>
        </div> 
    )
}
