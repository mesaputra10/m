import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  rowStockContainer: {
    paddingLeft: 32,
    flexDirection: 'column',
    paddingTop: 8
  },
  rowYellowStokOutlet: {
    paddingVertical: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'rgb(255, 239, 180)'
  },
  rowGreyStokOutlet: {
    paddingVertical: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'rgb(245, 245, 246)'
  },
  rowDefaultStokOutlet: {
    paddingVertical: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48
  },
  radioButtonContainer: {
    flex: 1,
    paddingLeft: 8
  },
  outletName: {
    flex: 3,
    fontSize: 14
  },
  textStatusStokTersedia: {
    flex: 6,
    fontWeight: '600',
    fontSize: 14
  },
  textStatusStokHabis: {
    flex: 6,
    width: 74,
    height: 20,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.08,
    color: 'rgb(237, 28, 36)'
  }
});
export default styles;
