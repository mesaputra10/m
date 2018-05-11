import { connect } from 'react-redux';
import { FilterProductsComponent } from './component';
import { setShowFilter } from '../../screens/home/action';
import { setFilterCategory } from './action';
import { setChildCategory, setChildBrand, fetchSearch } from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  setFilterCategory: (selectedCategoryId, selectedCategoryName) =>
    dispatch(setFilterCategory(selectedCategoryId, selectedCategoryName)),
  setShowFilter: data => dispatch(setShowFilter(data)),
  setChildCategory: data => dispatch(setChildCategory(data)),
  setChildBrand: data => dispatch(setChildBrand(data)),
  search: (keyword, filterParams) => dispatch(fetchSearch(keyword, 1, filterParams))
});

export const FilterProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterProductsComponent
);

export default FilterProductsContainer;
