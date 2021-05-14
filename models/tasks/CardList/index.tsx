import React, {useState} from 'react'
import styles from './CardList.module.scss'
import Card from './Card'

export default function CardList() {

    const [click, setClick] = useState(false)
    const [xCoord, setxCoord] = useState(0)
    const [yCoord, setyCoord] = useState(0)

    const clickHandler = (e) => {
        setxCoord(e.clientX)
        setyCoord(e.clientY)
        setClick(true)
    }

    const clickHandlerOver = () => {
        setClick(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__title}>
                <div className={styles.container__title__text}>PropsText</div>
                <div className={styles.container__title__counter}>PropsCounter</div>
                <div style={{ flexGrow: 1 }}></div>
                <div>
                    <button
                        className={styles.container__title__btns}
                        onClick={clickHandler}
                    >
                        ...
                    </button>
                </div>
               <div 
                    className={styles.container__title__overlay}  
                    onClick={clickHandlerOver}
                    style={{ display: click ? 'block' : 'none' }}
                >
                    <div 
                        className={styles.container__title__overlay__menu}
                        onClick={(e) => {e.stopPropagation()}}
                        style={{ left: `${xCoord}px`, top: `${yCoord}px` }}
                    >
                            <div className={styles.container__title__overlay__menu__list}>
                                <button>rename</button>
                                <button>delete</button>
                                <button>duplicate</button>
                            </div>
                    </div>
               </div>
                <div>
                    <div className={styles.container__title__btns}>+</div>
                </div>
            </div>
            <div className={styles.container__itemsContainer}>
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
                <button className={styles.container__newBtn}>+ New</button>
        </div>
    )
}
