import React, {useState, useEffect} from 'react'
import styles from './CardList.module.scss'
import Card from './Card'
import {connect} from 'react-redux'
import {deleteList, addNote, deleteNote, recountNote, recountNoteDel, recountList, recountNoteDrag} from '../../../redux/actions.js'


const CardList = function({list, deleteList, array, addNote, deleteNote, recountNote, recountNoteDel, recountList, recountNoteDrag}) {
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
        addNote(
          {
            number: counterNotes.length,
            numberList: list.number,
            note:'',
          }
        )
    }

    const deleteHandler = () => {
        deleteList(list)
        deleteNote(list.number)
        recountNote(list.number)
    }

    const dropHandler = (e,list) => {
        if(e.dataTransfer.getData('isList') != 1){
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
        
        if(e.dataTransfer.getData('isList') == 1) {
            
           recountNoteDrag(
                {
                    number: e.dataTransfer.getData('list.number'),
                    numberNew: list.number
                }
            )

            recountList(
                {
                    number: e.dataTransfer.getData('list.number'),
                    numberNew: list.number
                }
            )
        }
        
        e.dataTransfer.clearData()
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        
    }

    const dragStartHandler = (e, list) => {
        e.dataTransfer.setData('list.number', list.number)
        e.dataTransfer.setData('isList', 1)        
    }

    const sortFunc = (i) => {
        let itemF = arrayList.find((elem) => (i == elem.number))
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
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, list)}
            onTouchStart={(e) => dragStartHandler(e, list)}
            onTouchEnd={(e) => dropHandler(e, list)}
            onTouchMove={dragOverHandler}
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
                        return (
                            <Card 
                                note={item} 
                                key={`${item.number}`+"Card"+`${item.numberList}`}
                            />
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
    recountNoteDel,
    recountList,
    recountNoteDrag
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
