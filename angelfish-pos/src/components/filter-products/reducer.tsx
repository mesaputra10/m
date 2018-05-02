import ActionTypes from '../../store/action-types';
import { Action } from 'redux';

const initialState = {
  selectedCategoryId: '',
  selectedCategoryName: ''
};

interface ActionInterface extends Action {
  type: ActionTypes.SET_FILTER_CATEGORY;
  selectedCategoryId: string;
  selectedCategoryName: string;
}

interface ActionCategoriesInterface extends Action {
  type: ActionTypes.CATEGORIES_LIST;
  categories: any[];
}

const reducer = (state = initialState, action: ActionInterface | ActionCategoriesInterface) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER_CATEGORY: {
      return Object.assign({}, state, {
        selectedCategoryId: action.selectedCategoryId,
        selectedCategoryName: action.selectedCategoryName
      });
    }
    case ActionTypes.CATEGORIES_LIST: {
      return { ...state, categories: action.categories };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
