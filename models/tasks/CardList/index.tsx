import React from 'react'
import styles from './CardList.module.css'
import Card from './Card'

export default function CardList() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.title__text}>PropsText</div>
                <div className={styles.title__counter}>PropsCounter</div>
                <div style={{ flexGrow: 1 }}></div>
                <div>
                    <div className={styles.title__btns}>...</div>
                </div>
                <div>
                    <div className={styles.title__btns}>+</div>
                </div>
            </div>
            <div className={styles.itemsContainer}>
                <Card />
                <Card />
                <Card />
                {/* {
                    Array.map((elem) => {
                        return (
                            <Card />
                        )
                    })
                } */}
            </div>       
                <button className={styles.newBtn}>+ New</button>
        </div>
    )
}
