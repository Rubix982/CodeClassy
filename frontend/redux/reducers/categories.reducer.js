import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  categories : [],
  categoriesLoaded: false
}
const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.getCategories:
        return { ...state, 
          categories: [...action.payload.categories]
        }

      case actionTypes.addCategories:
        return { ...state, 
            categories: [...state.categories, action.payload.category],
            categoriesLoaded: true
        }

      default:
        return {...state}
    }
  };

export default categoriesReducer;



