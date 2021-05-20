import React, {useState} from 'react'
import styles from './CardList.module.scss'
import Card from './Card'
import {connect} from 'react-redux'
import {deleteList, addNote, deleteNote, recountNote} from '../../../redux/actions.js'

const CardList = function({list, deleteList, array, addNote, deleteNote, recountNote}) {

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

    let totalnotes = 0
    array.forEach((el) => {
        if (list.number == el.numberList) {
            totalnotes = totalnotes + 1
        }
    });

    const addHandler = () => {
        let counterNotes = array.filter(elem => elem.numberList == list.number)
        console.log(counterNotes);
        addNote(
          {
            number: counterNotes.length,
            numberList: list.number,
            note:'Untitled',
          }
        )
    }

    const deleteHandler = () => {
        deleteList(list)
        deleteNote(list.number)
        recountNote(list.number)
    }

    const dropHandler = (e,i) => {
        console.log('drop = ',i);
        
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        
    }

    return (
        <div 
            className={styles.container}
            onDrop={(e) => dropHandler(e, list)}
            onDragOver={dragOverHandler}
        >
            <div className={styles.container__title}>
                <div className={styles.container__title__text}>{list.title}</div>
                <div className={styles.container__title__counter}>{totalnotes}</div>
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
                                <button onClick={deleteHandler}>delete</button>
                            </div>
                    </div>
               </div>
                <div>
                    <div className={styles.container__title__btns} onClick={addHandler}>+</div>
                </div>
            </div>
            <div className={styles.container__itemsContainer}>
                {
                    array.map((elem) => {
                        if(elem.numberList == list.number) {
                            return (
                                <Card note={elem} key={`${elem.number}`+"Card"+`${elem.numberList}`}/>
                            )
                        }   
                    })
                }
            </div>       
                <button className={styles.container__newBtn} onClick={addHandler}>+ New</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        array: state.notes.notesItems
    }
}

const mapDispatchToProps = {
    deleteList,
    addNote,
    deleteNote,
    recountNote
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
