import { connect } from 'react-redux';
import { FilterPricesComponent } from './component';
import {
  setValueFilterPrices,
  setShowFilter,
  setShowFilterPrices
} from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  setValueFilterPrices: (min, max) => dispatch(setValueFilterPrices(min, max)),
  setShowFilterPrices: data => dispatch(setShowFilterPrices(data))
});

export const FilterPricesContainer = connect(mapStateToProps, mapDispatchToProps)(
  FilterPricesComponent
);

export default FilterPricesContainer;
