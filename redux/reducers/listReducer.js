import { ADD_LIST } from '../types.js'
import { DELETE_LIST } from '../types.js'
import { RECOUNT_LIST } from '../types.js'

const initialState = {
    listItems: [
        {
            number: 3,
            title: '3',
        },
        {
            number: 2,
            title: '2',
        },
        {
            number: 0,
            title: '0',
        },
        {
            number: 1,
            title: '1',
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

        case RECOUNT_LIST:
            let array = state.listItems
            array.forEach((e, i) => {
                if(Number(action.payload.number) < action.payload.numberNew) {
                    if((e.number > Number(action.payload.number))&&(e.number <= action.payload.numberNew)){
                        array[i].number = array[i].number - 1;
                        console.log('up');
                    } else {
                    if((e.number == Number(action.payload.number))){
                        array[i].number = action.payload.numberNew;
                        console.log('down');
                    }}
                }
                if(Number(action.payload.number) > action.payload.numberNew) {
                    if((e.number < Number(action.payload.number))&&(e.number >= action.payload.numberNew)){
                        array[i].number = array[i].number + 1;
                    } else {
                    if((e.number == Number(action.payload.number))){
                        array[i].number = action.payload.numberNew;
                    }}
                }
            })
            return { ...state, listItems: state.listItems.slice(array) }
    
        default: return state
    }
}

export default listReducer