import { connect } from 'react-redux';
import { FilterBrandsComponent } from './component';
import { setFilterBrands } from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  setFilterBrands: selectedBrands => dispatch(setFilterBrands(selectedBrands))
});

export const FilterBrandsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterBrandsComponent
);

export default FilterBrandsContainer;
