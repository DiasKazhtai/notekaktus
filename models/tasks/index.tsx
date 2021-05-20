import React from 'react'
import styles from './Tasks.module.scss'
import CardList from './CardList'
import HeaderMenu from '../header/headerMenu'
import HeaderStylized from '../header/headerStylized'
import AddListBtn from './AddListBtn'
import {connect} from 'react-redux'

const Tasks = function({array}) {
    return (
      <>
      <HeaderMenu modal={false}/>
      <HeaderStylized modal={false}/>
      <div className={styles.scrollContainer}>
          <div className={styles.scrollContainer__container}>
            <div className={styles.scrollContainer__container__cardListsContainer}>
              {
                array.map((elem) => {
                  return (
                    <CardList 
                      list={elem}
                      key={`${elem.number}`+`${elem.title}`}
                    />
                  )
                })
              }
            </div>
            <AddListBtn />
          </div>
      </div>
      </>
    )
  }

const mapStateToProps = state => {
    return {
        array: state.lists.listItems
    }
}


  export default connect(mapStateToProps, null)(Tasks)