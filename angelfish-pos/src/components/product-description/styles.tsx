import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: config.color.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    width: 343,
    height: 29,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: config.color.blue,
    backgroundColor: config.color.blue,
  },
  tabButtonContainer: {
    flex: 5,
    backgroundColor: config.color.white,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonContainerActive: {
    flex: 5,
    backgroundColor: config.color.blue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: config.color.blue,
  },
  tabButtonLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: config.color.blue,
  },
  tabTitleText: {
    color: config.color.blue,
  },
  tabTitleTextActive: {
    color: config.color.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
  contentStyleName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.08,
  },
  contentStyle: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
    letterSpacing: -0.08,
  },
  selengkapnyaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  selengkapnya: {
    fontSize: 16,
    color: config.color.blue,
  },
});
export default styles;
