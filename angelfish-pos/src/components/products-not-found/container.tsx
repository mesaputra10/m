import { connect } from 'react-redux';
import { ProductsNotFoundComponent } from './component';

const mapStateToProps = (state: any) => state.homeReducer;

const mapDispatchToProps = dispatch => ({});

export const ProductsNotFoundContainer = connect(mapStateToProps, mapDispatchToProps)(
  ProductsNotFoundComponent
);

export default ProductsNotFoundContainer;
