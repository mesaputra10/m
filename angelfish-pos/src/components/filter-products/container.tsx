import { connect } from 'react-redux';
import { FilterProductsComponent } from './component';
import { setFilterCategory, fetchCategories } from './action';

const mapStateToProps = (state: any) => state.filterProductsReducer;

const mapDispatchToProps = dispatch => ({
  setFilterCategory: (selectedCategoryId, selectedCategoryName) =>
    dispatch(setFilterCategory(selectedCategoryId, selectedCategoryName)),
  getCategories: (parentId: undefined) => dispatch(fetchCategories(parentId))
});

export const FilterProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterProductsComponent
);

export default FilterProductsContainer;
