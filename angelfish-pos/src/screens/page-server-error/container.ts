import { connect } from 'react-redux';
import { PageServerErrorComponent } from './component';

const mapStateToProps = (state: any) => {
  return {
    isServerError: state.globalReducer.isServerError
  };
};
export const PageServerErrorContainer = connect(mapStateToProps, null)(PageServerErrorComponent);
export default PageServerErrorContainer;
