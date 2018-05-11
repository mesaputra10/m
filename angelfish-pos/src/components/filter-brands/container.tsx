import { connect } from 'react-redux';
import { FilterBrandsComponent } from './component';
import {
  setFilterBrands,
  setShowFilter,
  setShowFilterBrands,
  setShowSearchBrands
} from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  setFilterBrands: selectedBrands => dispatch(setFilterBrands(selectedBrands)),
  setShowFilter: data => dispatch(setShowFilter(data)),
  setShowFilterBrands: data => dispatch(setShowFilterBrands(data)),
  setShowSearchBrands: data => dispatch(setShowSearchBrands(data))
});

export const FilterBrandsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterBrandsComponent
);

export default FilterBrandsContainer;
