import { ADD_LIST } from './types.js'
import { DELETE_LIST } from './types.js'
import { ADD_NOTE } from './types.js'
import { DELETE_NOTE, RENAME_NOTE } from './types.js'

export const addList = function (listItem) {
    return {
        type: ADD_LIST,
        payload: listItem
    }
}

export const deleteList = function (listItem) {
    return {
        type: DELETE_LIST,
        payload: listItem
    }
}

export const addNote = function (noteItem) {
    return {
        type: ADD_NOTE,
        payload: noteItem
    }
}

export const deleteNote = function (noteItem) {
    return {
        type: DELETE_NOTE,
        payload: noteItem
    }
}

export const renameNote = function(noteItem) {
    return {
        type: RENAME_NOTE,
        payload: noteItem
    }
}