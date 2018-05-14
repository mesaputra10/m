import { connect } from 'react-redux';
import { ListCategoriesComponent } from './component';
import {
  fetchSearch,
  setShowSearchResults,
  setShowParentCategory
} from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  search: filterParams => dispatch(fetchSearch('', 1, filterParams)),
  setShowSearchResults: data => dispatch(setShowSearchResults(data)),
  setShowParentCategory: data => dispatch(setShowParentCategory(data))
});

export const ListCategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(
  ListCategoriesComponent
);

export default ListCategoriesContainer;
