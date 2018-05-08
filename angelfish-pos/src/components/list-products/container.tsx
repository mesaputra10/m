import { connect } from 'react-redux';
import { ListProductsComponent } from './component';
import { setShowFilter } from '../../screens/home/action';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setShowFilter(filter))
});

export const ListProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  ListProductsComponent
);

export default ListProductsContainer;
