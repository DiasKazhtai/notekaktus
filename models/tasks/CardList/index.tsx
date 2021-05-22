import React, {useState, useEffect} from 'react'
import styles from './CardList.module.scss'
import Card from './Card'
import {connect} from 'react-redux'
import {deleteList, addNote, deleteNote, recountNote, recountNoteDel} from '../../../redux/actions.js'

const CardList = function({list, deleteList, array, addNote, deleteNote, recountNote, recountNoteDel}) {
    let arrayList = array.filter(note => (note.numberList == list.number)) 

    useEffect(() => {
        arrayList = array.filter(note => (note.numberList == list.number)) 
    })

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
        // console.log(counterNotes);
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

    const dropHandler = (e,list) => {
        
            // console.log('stroka = ', e.dataTransfer.getData("stroka"));
        deleteNote({
            number: e.dataTransfer.getData('item.number'),
            numberList: e.dataTransfer.getData('item.numberList'),
        })
        recountNoteDel({
            number: e.dataTransfer.getData('item.number'),
            numberList: e.dataTransfer.getData('item.numberList'),
        })     
        addNote(
            {
              number: e.dataTransfer.getData('item.number'),
              numberList: e.dataTransfer.getData('item.numberList'),
              note: e.dataTransfer.getData('item.note'),
              numberListNew: list.number
            }
          )
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        
    }

    const sortFunc = (i) => {
        console.log('arrayList = ',arrayList);
        let itemF = arrayList.find((elem) => (i == elem.number))
        console.log('itemF = ',i, itemF);
        
        return {
            number: itemF.number,
            numberList: itemF.numberList,
            note: itemF.note
        }
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
                    arrayList.map((elem,i) => {
                        let item = sortFunc(i)
                        console.log(item);
                        
                        return (
                            <Card note={item} key={`${item.number}`+"Card"+`${item.numberList}`}/>
                        )    
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
    recountNote,
    recountNoteDel
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
