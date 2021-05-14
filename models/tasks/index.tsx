import React from 'react'
import styles from './Tasks.module.scss'
import CardList from './CardList'
import HeaderMenu from '../header/headerMenu'
import HeaderStylized from '../header/headerStylized'




export default function Tasks() {
    return (
      <>
      <HeaderMenu />
      <HeaderStylized />
      <div className={styles.scrollContainer}>
          <div className={styles.scrollContainer__container}>
            <div className={styles.scrollContainer__container__cardListsContainer}>
              <CardList />
              <CardList />
              <CardList />
              {/* {
                Array.map((elem) => {
                  return (
                    <CardList 
                      title = {elem.title}
                    />
                  )
                })
              } */}
            </div>
            <div className={styles.scrollContainer__container__addAGroup}>
              <button className={styles.scrollContainer__container__addAGroup__btn}>
                <div style={{fontSize: "24px"}}>+</div>
                Add a group
              </button>
            </div>
          </div>
      </div>
      </>
    )
  }