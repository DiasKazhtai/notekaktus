import React, {useState} from 'react'
import styles from './Tasks.module.scss'
import CardList from './CardList'
import HeaderMenu from '../header/headerMenu'
import HeaderStylized from '../header/headerStylized'
import {connect} from 'react-redux'
import {addList} from '../../redux/actions.js'

const Tasks = function({addList, array}) {
  const [listTitle, setListTitle] = useState('')
  const [openArea, setOpenArea] = useState(false)


  const addHandler = (e) => {
    if(listTitle){
      addList(
        {
          number: array.length,
          title: listTitle,
        }
      )
      setListTitle('')
    }
    setOpenArea(false)
  }

  const areaHandler = () => {
    setOpenArea(true)
  }

  const changeHandler = (e) => {
    setListTitle(e.target.value)
  }

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
            <div className={styles.scrollContainer__container__addAGroup}>
              <button 
                className={styles.scrollContainer__container__addAGroup__btn}
                onClick={areaHandler}
                style={{ display: !openArea ? 'flex' : 'none' }}
              >
                <div style={{fontSize: "24px"}}>+</div>
                Add a group
              </button>
              <textarea 
                onChange={changeHandler} 
                onBlur={addHandler}
                style={{ display: openArea ? 'block' : 'none' }}
                autoFocus={true}
                value={listTitle}
              ></textarea>
            </div>
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

const mapDispatchToProps = {
    addList,  
}


  export default connect(mapStateToProps, mapDispatchToProps)(Tasks)