import { connect } from 'react-redux';
import { PageLandingComponent } from './component';
const mapStateToProps = (state: any) => {
  return {
    isConnected: state.globalReducer.isConnected
  };
};
export const PageLandingContainer = connect(mapStateToProps, null)(PageLandingComponent);
export default PageLandingContainer;
