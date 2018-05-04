import { connect } from 'react-redux';
import { HomeComponent } from './component';
import ActionTypes from '../../store/action-types';
import { fetchSearch, setFilter, setRemoveFilter, emptyProductsData } from './action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  search: (keyword, page, filterParams) => dispatch(fetchSearch(keyword, page, filterParams)),
  emptySearch: () => dispatch({ type: ActionTypes.PRODUCTS_SEARCH, keyword: '' }),
  setFilter: value => dispatch(setFilter(value)),
  setRemoveFilter: () => dispatch(setRemoveFilter())
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
