import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import config from '../../config';
import { ContentWrap } from './libraries/content-wrap';
import { ContentSpecification } from './libraries/content-specification';

const componentState = {
  leftActive: true,
  rightActive: false,
  selengkapnyaSpec: false,
  selengkapnyaInfo: false,
};

export class ProductDescriptionComponent extends Component<any, typeof componentState> {
  constructor(props) {
    super(props);
    this.state = componentState;
  }
  toggleTab = () => {
    this.setState({
      leftActive: !this.state.leftActive,
      rightActive: !this.state.rightActive,
    });
  };
  selengkapnyaSpec = () => {
    this.setState({ selengkapnyaSpec: true });
  };
  selengkapnyaInfo = () => {
    this.setState({ selengkapnyaInfo: true });
  };
  render() {
    const { productDescription, productSpecification } = this.props;
    const { selengkapnyaSpec, selengkapnyaInfo } = this.state;
    const lengthContent = 50;
    let contentSpec, contentInfo, summarySpec, summaryInfo;
    let leftActive = [
      styles.tabButtonContainer,
      {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
    ];
    let leftText = styles.tabTitleText;
    if (this.state.leftActive) {
      leftActive = [
        styles.tabButtonContainerActive,
        {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      ];
      leftText = styles.tabTitleTextActive;
      contentInfo = productDescription;
      summaryInfo = contentInfo.substring(0, lengthContent);
    }
    let rightActive = [
      styles.tabButtonContainer,
      {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
    ];
    let rightText = styles.tabTitleText;
    if (this.state.rightActive) {
      rightActive = [
        styles.tabButtonContainerActive,
        {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      ];
      rightText = styles.tabTitleTextActive;
      contentSpec = productSpecification;
      if (Array.isArray(contentSpec)) {
        if (contentSpec[0] !== undefined) {
          summarySpec = contentSpec[0];
        }
      }
    }

    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.tabHeaderContainer}>
            <TouchableWithoutFeedback onPress={this.toggleTab}>
              <View style={leftActive}>
                <Text style={leftText}>Informasi Produk</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.toggleTab}>
              <View style={rightActive}>
                <Text style={rightText}>Spesifikasi</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.state.leftActive && (
          <ContentWrap
            summary={summaryInfo}
            content={contentInfo}
            selengkapnya={selengkapnyaInfo}
            setSelengkapnya={this.selengkapnyaInfo}
          />
        )}
        {this.state.rightActive && (
          <ContentSpecification
            summary={summarySpec}
            content={contentSpec}
            selengkapnya={selengkapnyaSpec}
            setSelengkapnya={this.selengkapnyaSpec}
          />
        )}
      </View>
    );
  }
}

export default ProductDescriptionComponent;
