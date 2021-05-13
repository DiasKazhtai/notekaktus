import React from 'react'
import styles from './Tasks.module.css'
import CardList from './CardList'




export default function Tasks() {
    return (
      <div className={styles.scrollContainer}>
          <div className={styles.container}>
            <div className={styles.cardListsContainer}>
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
            <div className={styles.addAGroup}>
              <button className={styles.addGroup__btn}>
                <div style={{fontSize: "24px"}}>+</div>
                Add a group
              </button>
            </div>
          </div>
      </div>
    )
  }