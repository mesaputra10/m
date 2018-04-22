import { connect } from 'react-redux';
import { HomeComponent } from './component';
import { fetchSearch } from './action';

const mapStateToProps = (state: any) => state.searchReducer;

const mapDispatchToProps = dispatch => ({
  search: (keyword) => dispatch(fetchSearch(keyword)),
});

export const HomeContainer = connect(
  mapStateToProps, mapDispatchToProps
)(HomeComponent);

export default HomeContainer;
