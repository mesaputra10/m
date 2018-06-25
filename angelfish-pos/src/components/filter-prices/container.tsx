import { connect } from 'react-redux';
import { FilterPricesComponent } from './component';
import { setValueFilterPrices, setShowFilter } from '../../screens/home/action';

const mapStateToProps = (state: any) => ({
  minPriceRange: state.homeReducer.minPriceRange,
  maxPriceRange: state.homeReducer.maxPriceRange,
});

const mapDispatchToProps = dispatch => ({
  setValueFilterPrices: (min, max) => dispatch(setValueFilterPrices(min, max)),
});

export const FilterPricesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterPricesComponent);

export default FilterPricesContainer;
