import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  categories : []
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.getCategories:
        return { ...state, 
          totalSections: [...state.categories, action.payload.categories]
        }

      default:
        return {...state}
    }
  };

export default categoriesReducer;



