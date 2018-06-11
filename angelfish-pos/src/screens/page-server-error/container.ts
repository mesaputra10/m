import { connect } from 'react-redux';
import { PageServerErrorComponent } from './component';
import { logout } from '../home/action';

const mapStateToProps = (state: any) => {
  return {
    isServerError: state.globalReducer.isServerError,
  };
};
const mapDispatchToProps = dispatch => ({
  logout: navigate => dispatch(logout(navigate)),
});
export const PageServerErrorContainer = connect(mapStateToProps, mapDispatchToProps)(
  PageServerErrorComponent,
);
export default PageServerErrorContainer;
