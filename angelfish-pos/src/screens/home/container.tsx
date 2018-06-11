import { connect } from 'react-redux';
import { HomeComponent } from './component';
import ActionTypes from '../../store/action-types';
import {
  fetchSearch,
  setRemoveFilter,
  setRemoveFilterCategory,
  setRemoveFilterBrands,
  setShowFilter,
  setChildCategory,
  setChildBrand,
  startLoading,
  endLoading,
  resetProductsList,
  setValueFilterPrices,
  setShowSearchResults,
  setShowParentCategory,
  logout,
} from './action';
import { start } from 'repl';
import { fetchCategories } from './action';

const mapStateToProps = (state: any) => {
  return {
    ...state.homeReducer,
    isServerError: state.globalReducer.isServerError,
    isTokenExpired: state.globalReducer.isTokenExpired,
  };
};

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading()),
  search: (keyword, page, filterParams) => dispatch(fetchSearch(keyword, page, filterParams)),
  emptySearch: () => dispatch(resetProductsList()),
  loadCategories: () => dispatch(fetchCategories()),
  setShowFilter: value => dispatch(setShowFilter(value)),
  setRemoveFilter: () => dispatch(setRemoveFilter()),
  setRemoveFilterCategory: () => dispatch(setRemoveFilterCategory()),
  setRemoveFilterBrands: () => dispatch(setRemoveFilterBrands()),
  setChildCategory: data => dispatch(setChildCategory(data)),
  setChildBrand: data => dispatch(setChildBrand(data)),
  setValueFilterPrices: (min, max) => dispatch(setValueFilterPrices(min, max)),
  setShowSearchResults: data => dispatch(setShowSearchResults(data)),
  setShowParentCategory: data => dispatch(setShowParentCategory(data)),
  logout: navigate => dispatch(logout(navigate)),
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
