import React, {useState} from 'react'
import styles from './Card.module.scss'

export default function Card() {
    const [hover, setHover] = useState(false)
    const [click, setClick] = useState(false)

    const [xCoord, setxCoord] = useState(0)
    const [yCoord, setyCoord] = useState(0)

   const overHandler = () => {
        setHover(true)
    }

    const outHandler = () => {
        setHover(false)
    }

    const clickHandler = (e) => {
        setClick(true)
        setHover(false)
        setxCoord(e.clientX)
        setyCoord(e.clientY)
    }

    const clickHandlerOver = () => {
        setClick(false)
    }

    return (
        <div className={styles.container} onMouseOver={overHandler} onMouseOut={outHandler}>
           <div className={styles.container__padding}>
               <div className={styles.container__padding__text}>
                    PropsText
               </div>
               <button
                    style={{ 
                        opacity: hover ? '1' : '0', 
                    }}
                    className={styles.container__padding__btn}
                    onClick={clickHandler}
               >
                   ...
               </button>
               <div 
                    className={styles.container__padding__overlay}  
                    onClick={clickHandlerOver}
                    style={{ display: click ? 'block' : 'none' }}
                >
                    <div 
                        className={styles.container__padding__overlay__menu}
                        onClick={(e) => {e.stopPropagation()}}
                        style={{ left: `${xCoord}px`, top: `${yCoord}px` }}
                    >
                            <div className={styles.container__padding__overlay__menu__list}>
                                <button>rename</button>
                                <button>delete</button>
                                <button>duplicate</button>
                            </div>
                    </div>
               </div>
            </div> 
        </div>
    )
}
