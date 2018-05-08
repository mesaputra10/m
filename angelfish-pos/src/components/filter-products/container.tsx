import { connect } from 'react-redux';
import { FilterProductsComponent } from './component';
import {
  setShowFilter,
  setShowFilterCategory,
  setShowFilterBrands,
  setShowFilterPrices
} from '../../screens/home/action';
import { setFilterCategory, fetchCategories } from './action';
import { setChildCategory, setChildBrand, fetchSearch } from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchCategories()),
  setFilterCategory: (selectedCategoryId, selectedCategoryName) =>
    dispatch(setFilterCategory(selectedCategoryId, selectedCategoryName)),
  setShowFilter: data => dispatch(setShowFilter(data)),
  setShowFilterCategory: data => dispatch(setShowFilterCategory(data)),
  setShowFilterBrands: data => dispatch(setShowFilterBrands(data)),
  setShowFilterPrices: data => dispatch(setShowFilterPrices(data)),
  setChildCategory: data => dispatch(setChildCategory(data)),
  setChildBrand: data => dispatch(setChildBrand(data)),
  search: (keyword, filterParams) => dispatch(fetchSearch(keyword, filterParams))
});

export const FilterProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterProductsComponent
);

export default FilterProductsContainer;
