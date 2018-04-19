import { connect } from 'react-redux';
import { HomeComponent } from './component';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = dispatch => ({
});

export const HomeContainer = connect(
  mapStateToProps, mapDispatchToProps
)(HomeComponent);

export default HomeContainer;
