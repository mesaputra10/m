import { connect } from 'react-redux';
import { FilterProductsComponent } from './component';
import { setFilterCategory, fetchCategories, setFilterBrand } from './action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchCategories()),
  setFilterCategory: (selectedCategoryId, selectedCategoryName) =>
    dispatch(setFilterCategory(selectedCategoryId, selectedCategoryName)),
  setFilterBrand: (selectedBrandId, selectedBrandName) =>
    dispatch(setFilterBrand(selectedBrandId, selectedBrandName))
});

export const FilterProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterProductsComponent
);

export default FilterProductsContainer;
