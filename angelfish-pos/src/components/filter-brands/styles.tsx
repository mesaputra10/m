import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    marginTop: -16,
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  listContainer: {
    borderBottomWidth: 0.5,
    borderColor: config.color.border,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleListText: {
    fontSize: 16,
    paddingBottom: 4,
    paddingLeft: 16,
    alignItems: 'center',
    marginTop: 5
  },
  circleStyle: {
    width: 24,
    height: 24,
    borderRadius: 25,
    borderWidth: 1
  },
  buttonBottomContainer: {
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
    alignItems: 'flex-end',
    backgroundColor: config.color.backgroundGrey
  },
  buttonBottomStyle: {
    width: 275,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.color.blue,
    borderRadius: 5
  },
  buttonBottomText: {
    color: config.color.white,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10
  }
});
export default styles;
