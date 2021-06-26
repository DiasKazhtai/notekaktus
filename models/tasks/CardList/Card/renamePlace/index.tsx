import React, {useState} from 'react'
import styles from './renamePlace.module.scss'
import {connect} from 'react-redux'
import {renameNote} from '../../../../../redux/actions.js'

const renamePlace = function({rename, note, renameNote, closeF}) {
    const [noteText, setNoteText] = useState(`${note.note}`)

    const renameHandler = () => {
        renameNote({
            note: note,
            noteText: noteText
        })
        closeF(false)
    }

    const changeHandler = (e) => {
        setNoteText(e.target.value)       
    }


    if(!rename) {
        return(
            <div 
                className={styles.text} 
            >
                {note.note}
            </div>
        )
    } else {
        return (
                <textarea 
                    onChange={changeHandler} 
                    onBlur={renameHandler}
                    autoFocus={true}
                    value={noteText}
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }
                    }
                    draggable={false}
                    className={styles.area}
                ></textarea>  
 )
    }
}

const mapDispatchToProps = {
    renameNote,
}


  export default connect(null, mapDispatchToProps)(renamePlace)
