import React, {useState} from 'react'
import styles from './bigModal.module.scss'
import HeaderMenu from '../../../../header/headerMenu'

export default function bigModal() {
    const [click, setClick] = useState(false)

    const clickHandlerOver = () => {
        setClick(false)
    }

    return (
        <div 
            className={styles.container}  
            onClick={clickHandlerOver}
            style={{ display: click ? 'block' : 'none' }}
        >
            <HeaderMenu />
            <div 
                className={styles.container__menu}
                onClick={(e) => {e.stopPropagation()}}
            >
                    <div className={styles.container__menu__list}>
                        <button>rename</button>
                        <button>delete</button>
                        <button>duplicate</button>
                    </div>
            </div>
        </div>
    )
}
