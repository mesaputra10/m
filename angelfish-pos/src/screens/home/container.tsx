import { connect } from 'react-redux';
import { HomeComponent } from './component';
import ActionTypes from '../../store/action-types';
import {
  fetchSearch,
  setRemoveFilter,
  setRemoveFilterCategory,
  setRemoveFilterBrands,
  setShowFilter,
  setShowFilterCategory,
  setShowFilterBrands,
  setChildCategory,
  setChildBrand,
  startLoading,
  endLoading
} from './action';
import { start } from 'repl';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading()),
  search: (keyword, page, filterParams) => dispatch(fetchSearch(keyword, page, filterParams)),
  emptySearch: () => dispatch({ type: ActionTypes.PRODUCTS_SEARCH, keyword: '' }),
  setShowFilter: value => dispatch(setShowFilter(value)),
  setShowFilterCategory: value => dispatch(setShowFilterCategory(value)),
  setShowFilterBrands: value => dispatch(setShowFilterBrands(value)),
  setRemoveFilter: () => dispatch(setRemoveFilter()),
  setRemoveFilterCategory: () => dispatch(setRemoveFilterCategory()),
  setRemoveFilterBrands: () => dispatch(setRemoveFilterBrands()),
  setChildCategory: data => dispatch(setChildCategory(data)),
  setChildBrand: data => dispatch(setChildBrand(data))
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
