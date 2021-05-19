import { ADD_NOTE } from '../types'
import { DELETE_NOTE } from '../types'
import { RENAME_NOTE } from '../types'

const initialState = {
    notesItems: [
        {
            numberList: 0,
            number: 0,
            note: 'Card 1',
        },
        {
            numberList: 0,
            number: 1,
            note: 'Card 2',
        },
        {
            numberList: 0,
            number: 2,
            note: 'Card 3',
        },
    ]
}

const notesReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_NOTE:
            return {...state, notesItems: state.notesItems.concat(action.payload)}

        case DELETE_NOTE:
            if(action.payload.numberList != undefined) {
                return {...state, notesItems: state.notesItems.filter(note => (note.numberList != action.payload.numberList)||(note.number != action.payload.number))}
            }

            if(action.payload.numberList === undefined) {
                return {...state, notesItems: state.notesItems.filter(note => (note.numberList != action.payload))}
            }
         
        case RENAME_NOTE:
            let array = state.notesItems
            array.splice(action.payload.note.number, 1, {
                numberList: action.payload.note.numberList,
                number: action.payload.note.number,
                note: action.payload.noteText,
            })
            return {...state, notesItems: state.notesItems.slice(array)}

            default: return state
    }
}

export default notesReducer