import { connect } from 'react-redux';
import { ListProductsComponent } from './component';
import { setFilter } from './action';

const mapStateToProps = (state: any) => state.listProductsReducer;

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter))
});

export const ListProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  ListProductsComponent
);

export default ListProductsContainer;
