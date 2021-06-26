import React, {useState} from 'react'
import styles from './headerStylized.module.scss'

export default function headerStylized({modal, title}) {
    const [hide, setHide] = useState(true)

    const hoverHandler = () => {
        setHide(false)
    }

    const outHandler = () => {
        setHide(true)
    }

    return (
        <div
            className={styles.container}
            onMouseOver={hoverHandler}
            onMouseOut={outHandler}
        >
            <div className={styles.container__center} style={{ padding: modal ? '0 126px' : '0 96px' }}>
                <div className={styles.container__center__hidden}>
                    <div
                        className={styles.container__center__hidden__item}
                        style={{ opacity: hide ? '0' : '1' }}
                    >Add icon</div>
                    <div
                        className={styles.container__center__hidden__item}
                        style={{ opacity: hide ? '0' : '1' }}
                    >Add cover</div>
                    <div
                        className={styles.container__center__hidden__item}
                        style={{ opacity: hide ? '0' : '1', display: modal ? 'none' : 'flex' }}
                    >Add description</div>
                </div>
                <div className={styles.container__center__title}>{title}</div>
            </div>
        </div>
    )
}
