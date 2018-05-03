import { connect } from 'react-redux';
import { HomeComponent } from './component';
import ActionTypes from '../../store/action-types';
import { fetchSearch, setFilter } from './action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  search: (keyword, filterParams) => dispatch(fetchSearch(keyword, filterParams)),
  emptySearch: () => dispatch({ type: ActionTypes.PRODUCTS_SEARCH, keyword: '' }),
  setFilter: value => dispatch(setFilter(value))
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
