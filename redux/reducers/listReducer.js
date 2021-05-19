import { ADD_LIST } from '../types.js'
import { DELETE_LIST } from '../types.js'

const initialState = {
    listItems: [
        {
            number: 0,
            title: 'No status',
            block: true,
        },
        {
            number: 1,
            title: 'Not started',
        },
        {
            number: 2,
            title: 'In progress',
        },
        {
            number: 3,
            title: 'Completed',
        },
    ]
  }

  const listReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case ADD_LIST:
        return { ...state, listItems: state.listItems.concat(action.payload) }

      case DELETE_LIST:
        return {...state, listItems: state.listItems.filter(list => list.number != action.payload.number).map((e, i) => {
            return {
                number: i,
                title: `${e.title}`,
            }
        })}
    
        default: return state
    }
}

export default listReducer