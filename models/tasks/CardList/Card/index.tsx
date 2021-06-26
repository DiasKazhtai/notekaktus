import React, { useState, useEffect } from 'react'
import BigModal from './bigModal'
import styles from './Card.module.scss'
import {connect} from 'react-redux'
import {addNote, deleteNote, renameNote, recountNoteDel} from '../../../../redux/actions.js'
import RenamePlace from './renamePlace'

const Card = function({note, deleteNote, recountNoteDel, addNote}) {
    const [hover, setHover] = useState(false)
    const [click, setClick] = useState(false)
    const [clickModal, setClickModal] = useState(false)

    const [xCoord, setxCoord] = useState(0)
    const [yCoord, setyCoord] = useState(0)

    const [openArea, setOpenArea] = useState(false)

    useEffect(() => {
        if(!note.note){
            setOpenArea(true)
        }
    })

    

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
        e.stopPropagation();
    }

    const clickHandlerOver = (e) => {
        setClick(false)
        e.stopPropagation();
    }

    const openModalHandler = (e) => {
        setClickModal(!clickModal)
        e.stopPropagation();
    }

    const deleteHandler = () => {
        deleteNote(note)
        recountNoteDel({
            number: note.number,
            numberList: note.numberList
        })
        setClick(false)
    }  

    const areaHandler = () => {
        setOpenArea(true)
        setClick(false)
    }

    const dragHandler =(e,item) => {
        if(!openArea){
            e.dataTransfer.setData('item.number', item.number)
            e.dataTransfer.setData('item.note', item.note)
            e.dataTransfer.setData('item.numberList', item.numberList)
        }
        e.stopPropagation()
    }

    
    const dropHandler = (e,note) => {
        e.preventDefault()
        e.stopPropagation()
        if(e.dataTransfer.getData('item.number')){
            addNote(
                {
                    number: e.dataTransfer.getData('item.number'),
                    numberList: e.dataTransfer.getData('item.numberList'),
                    note: e.dataTransfer.getData('item.note'),
                    numberNew: note.number,
                    numberListNew: note.numberList
                }
            )
         }   
        e.dataTransfer.clearData() 
    }

    const dragOverHandler =(e) => {
        e.preventDefault()
    }

    const closeF = (e) => {
        setOpenArea(e)
    }

    return (
        <div 
            draggable={!clickModal}
            className={styles.container} 
            onMouseOver={overHandler} 
            onMouseOut={outHandler}
            onClick={openModalHandler}
            onDragStart={(e) => dragHandler(e, note)}
            onDrop={(e) => dropHandler(e, note)}
            onDragOver={dragOverHandler}
            onTouchStart={(e) => dragHandler(e, note)}
            onTouchEnd ={(e) => dropHandler(e, note)}
           // onTouchMove={dragOverHandler}
        >
            <div
                className={styles.container__padding__overlay}  
                onClick={openModalHandler}
                style={{ display: clickModal ? 'block' : 'none' }}
                draggable={false}
            >
                <BigModal note={note.note} />
            </div>
           <div className={styles.container__padding}>
              
               <RenamePlace rename={openArea} note={note} closeF={closeF} />
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
                                <button onClick={areaHandler}>rename</button>
                                <button onClick={deleteHandler}>delete</button>
                            </div>
                    </div>
               </div>
            </div> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        array: state.notes.notesItems
    }
}

const mapDispatchToProps = {
    addNote,
    deleteNote,
    renameNote,
    recountNoteDel
}


  export default connect(mapStateToProps, mapDispatchToProps)(Card)
