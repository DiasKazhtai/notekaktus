import React, { useState } from 'react'
import BigModal from './bigModal'
import styles from './Card.module.scss'
import {connect} from 'react-redux'
import {addNote, deleteNote, renameNote, recountNoteDel} from '../../../../redux/actions.js'

const Card = function({note, deleteNote, renameNote, recountNoteDel}) {
    const [hover, setHover] = useState(false)
    const [click, setClick] = useState(false)
    const [clickModal, setClickModal] = useState(false)

    const [xCoord, setxCoord] = useState(0)
    const [yCoord, setyCoord] = useState(0)

    const [noteText, setNoteText] = useState(`${note.note}`)
    const [openArea, setOpenArea] = useState(false)


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

    const openModalHandler = () => {
        setClickModal(!clickModal)
    }

    const deleteHandler = () => {
        deleteNote(note)
        recountNoteDel(note.number)
        setClick(false)
    }

    const changeHandler = (e) => {
        setNoteText(e.target.value)
      }

    const renameHandler = () => {
        renameNote({
            note: note,
            noteText: noteText
        })
        setOpenArea(false)
    }

    const areaHandler = () => {
        setOpenArea(true)
        setClick(false)
    }

    return (
        <div 
            className={styles.container} 
            onMouseOver={overHandler} 
            onMouseOut={outHandler}
            onClick={openModalHandler}
        >
            <div
                className={styles.container__padding__overlay}  
                onClick={openModalHandler}
                style={{ display: clickModal ? 'block' : 'none' }}
            >
                <BigModal />
            </div>
           <div className={styles.container__padding}>
               <div 
                    className={styles.container__padding__text} 
                    style={{ display: !openArea ? 'flex' : 'none' }}
                >
                    {note.note}
               </div>
               <textarea 
                    onChange={changeHandler} 
                    onBlur={renameHandler}
                    style={{ display: openArea ? 'block' : 'none' }}
                    autoFocus={true}
                    value={noteText}
                    onClick={(e) => e.stopPropagation()}
                ></textarea>
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
