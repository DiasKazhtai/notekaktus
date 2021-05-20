import React, {useState} from 'react'
import styles from './AddListBtn.module.scss'
import {connect} from 'react-redux'
import {addList} from '../../../redux/actions.js'

const AddListBtn = function({array, addList}) {
    const [openArea, setOpenArea] = useState(false)
    const [listTitle, setListTitle] = useState('')

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

    if(!openArea){
        return (
            <div className={styles.container}>
                <button 
                    className={styles.container__btn}
                    onClick={areaHandler}
                    style={{ display: !openArea ? 'flex' : 'none' }}
                >
                    <div style={{fontSize: "24px"}}>+</div>
                    Add a group
                </button>
            </div>
        )
    }else {
        return (
            <div className={styles.container}>
                <textarea 
                    onChange={changeHandler} 
                    onBlur={addHandler}
                    style={{ display: openArea ? 'block' : 'none' }}
                    autoFocus
                    value={listTitle}
                ></textarea>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addList,  
}

const mapStateToProps = state => {
    return {
        array: state.lists.listItems
    }
}


  export default connect(mapStateToProps, mapDispatchToProps)(AddListBtn)
