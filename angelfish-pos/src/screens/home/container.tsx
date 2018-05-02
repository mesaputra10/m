import { connect } from 'react-redux';
import { HomeComponent } from './component';
import { fetchSearch } from './action';
import ActionTypes from '../../store/action-types';

const mapStateToProps = (state: any) => state.searchReducer;

const mapDispatchToProps = dispatch => ({
  search: keyword => dispatch(fetchSearch(keyword)),
  emptySearch: () => dispatch({ type: ActionTypes.PRODUCTS_SEARCH, keyword: '' })
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
