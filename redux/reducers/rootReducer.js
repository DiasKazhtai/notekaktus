import {combineReducers} from 'redux'
import listReducer from './listReducer.js'
import notesReducer from './notesReducer.js'

const rootReducer = combineReducers({
    lists: listReducer,
    notes: notesReducer,
})

export default rootReducer