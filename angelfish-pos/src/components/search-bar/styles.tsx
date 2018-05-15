import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  searchBrandContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingVertical: 8
  },
  searchBrandWrap: {
    flex: 10,
    height: 30,
    backgroundColor: '#f0f0f1',
    borderRadius: 5,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconSearch: {
    fontSize: 16,
    justifyContent: 'flex-start'
  },
  searchInputText: {
    flex: 8,
    color: config.color.text,
    fontSize: 16,
    paddingLeft: 8
  },
  searchBrandBatalContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 5
  },
  buttonBatalSearch: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  batalSearchText: {
    color: config.color.blue,
    fontSize: 17
  },
  iconCancel: {
    alignItems: 'center',
    marginRight: 0
  },
  buttonClearSearch: {
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
export default styles;
