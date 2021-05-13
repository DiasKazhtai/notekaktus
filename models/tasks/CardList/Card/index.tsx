import React from 'react'
import styles from './Card.module.css'

export default function Card() {
    return (
        <div className={styles.container}>
           <div className={styles.container__padding}>
               <div className={styles.container__padding__text}>
                    PropsText
               </div>
            </div> 
        </div>
    )
}
