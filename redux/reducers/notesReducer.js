import { ADD_NOTE } from '../types'
import { DELETE_NOTE } from '../types'
import { RENAME_NOTE } from '../types'
import { RECOUNT_NOTE } from '../types'
import { RECOUNT_NOTEDEl } from '../types'
import { RECOUNT_NOTEDRAG } from '../types'

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
            let array
            let indexI
            if(action.payload.numberNew === undefined) {
                if(action.payload.numberListNew === undefined) {
                    return {...state, notesItems: state.notesItems.concat(action.payload)}
                }

                if(action.payload.numberListNew != undefined) {
                    array = state.notesItems
                    let counterNotes = array.filter(elem => elem.numberList == action.payload.numberListNew)
                    return {...state, notesItems: state.notesItems.concat({
                        number: counterNotes.length,
                        numberList: action.payload.numberListNew,
                        note: action.payload.note
                    })}
                }
                
            }
            
                if(action.payload.numberNew != undefined){
                array = state.notesItems
                indexI = array.findIndex(noteI => (noteI.numberList == action.payload.numberList)&&(noteI.number == action.payload.number))
                array.forEach((e) => {
                    if((e.number > action.payload.numberNew)&&(e.numberList == action.payload.numberListNew)){
                        e.number = e.number + 1;
                    }
                    if((e.number > Number(action.payload.number))&&(e.numberList == Number(action.payload.numberList))){
                        e.number = e.number - 1;
                    }
                })
                if(action.payload.numberListNew != action.payload.numberList){
                array.splice(indexI, 1, {
                    number: action.payload.numberNew + 1,
                    numberList: action.payload.numberListNew,
                    note: action.payload.note
              })
            } else {
                if(action.payload.numberNew < action.payload.number){
                    array.splice(indexI, 1, {
                        number: action.payload.numberNew + 1,
                        numberList: action.payload.numberListNew,
                        note: action.payload.note
                  })
                } else {
                    array.splice(indexI, 1, {
                        number: action.payload.numberNew,
                        numberList: action.payload.numberListNew,
                        note: action.payload.note
                  })
                }
                
            }
                return {...state, notesItems: state.notesItems.slice(array)}
                
            }

        case DELETE_NOTE:
            if(action.payload.numberList != undefined) {
                return {...state, notesItems: state.notesItems.filter(note => (note.numberList != action.payload.numberList)||(note.number != action.payload.number))}
            }

            if(action.payload.numberList === undefined) {
                return {...state, notesItems: state.notesItems.filter(note => (note.numberList != action.payload))}
            }
         
        case RENAME_NOTE:
            array = state.notesItems
            indexI = array.findIndex(noteI => (noteI.numberList == action.payload.note.numberList)&&(noteI.number == action.payload.note.number))
            array.splice(indexI, 1, {
                numberList: action.payload.note.numberList,
                number:  action.payload.note.number,
                note: action.payload.noteText,
            })
            return {...state, notesItems: state.notesItems.slice(array)}

        case RECOUNT_NOTE:
            array = state.notesItems
           
           if(action.payload.number === undefined) {
                array.forEach((e,i) => {
                if(e.numberList > action.payload){
                    e.numberList = e.numberList - 1;
                }
            })}

        case RECOUNT_NOTEDEl:
        array = state.notesItems
        array.forEach((e,i) => {
            if((e.number > action.payload.number)&&(e.numberList == action.payload.numberList)){
                array[i].number = array[i].number - 1;
            }
        })
        return {...state, notesItems: state.notesItems.slice(array)}

        case RECOUNT_NOTEDRAG:
            array = state.notesItems
            let arrayH = array.slice(state.notesItems)
            arrayH.map((e,i) => {
                if(Number(action.payload.number) < action.payload.numberNew) {
                    if((e.numberList > Number(action.payload.number))&&(e.numberList <= action.payload.numberNew)){
                        arrayH[i].numberList = arrayH[i].numberList - 1;
                    } else {
                    if((e.numberList == Number(action.payload.number))){
                        arrayH[i].numberList = action.payload.numberNew;
                    }}
                }
                if(Number(action.payload.number) > action.payload.numberNew) {
                    if((e.numberList < Number(action.payload.number))&&(e.numberList >= action.payload.numberNew)){
                        arrayH[i].numberList = arrayH[i].numberList + 1;
                    } else {
                    if((e.numberList == Number(action.payload.number))){
                        arrayH[i].numberList = action.payload.numberNew;
                    }}
                }
            })
            return {...state, notesItems: state.notesItems.slice(array)}

            default: return state
    }
}

export default notesReducer