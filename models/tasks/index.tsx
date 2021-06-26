import React, {useEffect} from 'react'
import styles from './Tasks.module.scss'
import CardList from './CardList'
import HeaderMenu from '../header/headerMenu'
import HeaderStylized from '../header/headerStylized'
import AddListBtn from './AddListBtn'
import {connect} from 'react-redux'

const Tasks = function({array}) {

  const sortFunc = (i) => {
    let itemF = array.find((elem) => (i == elem.number))
    
    return {
        number: itemF.number,
        title: itemF.title
    }
}

    return (
      <>
      <HeaderMenu modal={false} title={'NoteKaktus'} />
      <HeaderStylized modal={false} title={'NoteKaktus'} />
      <div className={styles.scrollContainer}>
          <div className={styles.scrollContainer__container}>
            <div className={styles.scrollContainer__container__cardListsContainer}>
              {
                array.map((elem, i) => {
                  let item = sortFunc(i)
                  return (
                    <CardList 
                      list={item}
                      key={`${item.number}`+`${item.title}`}
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