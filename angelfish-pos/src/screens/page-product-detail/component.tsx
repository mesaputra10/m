import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { NavigationScreenProps } from 'react-navigation';
import { Layout } from '../../components/layout';
import { StokList } from '../../components/stok-list';
import { ProductDescription } from '../../components/product-description';
import { styles } from './styles';
import config from '../../config';
import { Rating } from '../../components/rating';
import { fetchDataProduct } from './action';
import { Price } from './libraries/price';
import {
  fetchProductOffer,
  fetchProductVariant,
  fetchProductSpecification,
  fetchProductInstallments,
} from '../../helpers/fetch-data';
import numberFormat from '../../helpers/number-format';

interface PageProductDetailComponentProps extends NavigationScreenProps<any, any> {
  navigation: any;
  sku: string;
}

const installments = [
  {
    id: 13,
    method: 'Cicilan 0% Danamon',
    name: 'Cicilan Danamon 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-installment-danamon.png',
    bankName: 'Danamon',
    bankCode: '011',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 10,
    method: 'Cicilan 0% Bukopin',
    name: 'Cicilan Bukopin 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-bukopin.png',
    bankName: 'Bukopin',
    bankCode: '441',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 19,
    method: 'Cicilan 0% Permata',
    name: 'Cicilan Permata 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-permata.png',
    bankName: 'Permata Bank',
    bankCode: '013',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 12,
    method: 'Cicilan 0% Citibank',
    name: 'Cicilan Citibank 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-citibank.png',
    bankName: 'Citibank',
    bankCode: '031',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 20,
    method: 'Cicilan 0% Standard Chartered',
    name: 'Cicilan Standard Chartered 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-standarchartered.png',
    bankName: 'Standard Chartered Bank',
    bankCode: '050',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 14,
    method: 'Cicilan 0% HSBC',
    name: 'Cicilan HSBC 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-hsbc.png',
    bankName: 'HSBC',
    bankCode: '087',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 16,
    method: 'Cicilan 0% Maybank',
    name: 'Cicilan Maybank 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-maybank.png',
    bankName: 'Maybank',
    bankCode: '016',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 17,
    method: 'Cicilan 0% OCBC NISP',
    name: 'Cicilan OCBC NISP 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-ocbc.png',
    bankName: 'OCBC NISP',
    bankCode: '028',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 9,
    method: 'Cicilan 0% BRI',
    name: 'Cicilan BRI 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-bri.png',
    bankName: 'BRI',
    bankCode: '002',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 21,
    method: 'Cicilan 0% UOB',
    name: 'Cicilan UOB 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-uob.png',
    bankName: 'UOB Indonesia',
    bankCode: '023',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 6,
    method: 'Cicilan 0% ANZ',
    name: 'Cicilan ANZ 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-installment-anz.png',
    bankName: '',
    bankCode: '',
    currency: '',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 87,
    method: 'Bank DKI',
    name: 'Bank DKI',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/klikbca.png',
    bankName: 'Bank DKI',
    bankCode: '2163162372678',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 8,
    method: 'Cicilan 0% BNI',
    name: 'Cicilan BNI 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-bni.png',
    bankName: 'BNI',
    bankCode: '009',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 7,
    method: 'Cicilan 0% BCA',
    name: 'Cicilan BCA 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-installment-bca.png',
    bankName: 'BCA',
    bankCode: '014',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 15,
    method: 'Cicilan 0% Mandiri',
    name: 'Cicilan Mandiri 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-bank-mandiri.png',
    bankName: 'Mandiri',
    bankCode: '008',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
  {
    id: 11,
    method: 'Cicilan 0% CIMB Niaga',
    name: 'Cicilan CIMB Niaga 0%',
    image:
      'https://s3-ap-southeast-1.amazonaws.com/static.bmdstatic.com/sf/payment_method_images/logo-installment-cimb.png',
    bankName: 'CIMB Niaga',
    bankCode: '022',
    currency: 'IDR',
    term: {
      '3': 4928000,
      '6': 2464000,
      '12': 1232000,
    },
  },
];

export class PageProductDetailComponent extends Component<PageProductDetailComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        fullName: '',
        sku: '',
        categoryName: '',
        images: null,
        loading: true,
      },
      variant: null,
      specification: [],
      showListBank: false,
      bankName: '',
      showListMonth: false,
      selectedMonth: '',
      cicilan: 0,
      outletLocation: '',
      stockAvailable: 0,
    };
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const sku = params.sku;
    fetchDataProduct(sku)
      .then(data => {
        if (data.sku !== '') {
          this.setState({
            product: data,
            loading: false,
          });
        } else {
          Alert.alert('Error!', `Error Hubungi API Engineer dengan SKU: ${sku}`, [
            { text: 'OK', onPress: () => this.props.navigation.pop() },
          ]);
        }
      })
      .catch(err => console.log('Error', err));
    fetchProductVariant(params.variantId)
      .then(variant => {
        this.setState({ variant });
      })
      .catch(err => console.log(err));
    fetchProductSpecification(sku)
      .then(specification => this.setState({ specification }))
      .catch(err => console.log('error product specifications: ', err));
    fetchProductInstallments(sku)
      .then(data => {
        let { installments, price } = data;
        console.log(installments);
      })
      .catch(err => console.log(err));
  }
  backCategory = () => {
    this.props.navigation.pop();
  };
  productImage = () => {
    const { product } = this.state;
    let image = require('./assets/icGreyNoImage.png');
    const winWidth = Dimensions.get('window').width * 0.667;
    if (product.images !== null) {
      if (product.images.length > 1) {
        const productImages = product.images.map(i => i.imagePath);
        return (
          <ImageSlider
            autoPlayWithInterval={3000}
            images={productImages}
            width={winWidth}
            backgroundColor="#fff"
            customSlide={({ index, item, style, width }) => {
              return (
                <View key={item}>
                  <Image
                    source={{ uri: item }}
                    resizeMode="contain"
                    style={{ width: winWidth, height: 700 }}
                  />
                </View>
              );
            }}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                {productImages.map((image, index) => {
                  const styleSelected = position === index ? styles.buttonSelected : styles.button;
                  return (
                    <TouchableHighlight
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => move(index)}
                      style={styleSelected}
                    >
                      <Text />
                    </TouchableHighlight>
                  );
                })}
              </View>
            )}
          />
        );
      } else {
        return (
          <Image
            source={{ uri: product.images[0].imagePath }}
            resizeMode="contain"
            style={styles.productImage}
          />
        );
      }
    }
    return null;
  };
  toggleListBank = (value: boolean, bankName: string = '') => {
    this.setState({ showListBank: value, bankName, showListMonth: false });
  };
  listDataBank = () => {
    return (
      <View style={styles.filterDropdownContainer}>
        <View style={styles.centilanContainer}>
          <Image source={require('./assets/triangle.png')} />
        </View>
        <View style={styles.optionsContainer}>
          {installments.map((bank, bankIndex) => {
            const noBorder = installments.length - 1 === bankIndex ? styles.noBorderBottom : null;
            return (
              <TouchableWithoutFeedback
                key={bankIndex + '-' + bank.bankName}
                onPress={() => {
                  this.toggleListBank(false, bank.bankName);
                }}
              >
                <View style={[styles.sortContainer, noBorder]}>
                  <View style={styles.sectionSortContainer}>
                    <Text style={styles.textSort}>{bank.bankName}</Text>
                  </View>
                  {this.state.bankName == bank.bankName && this.checkSelectedSortBy()}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  };
  toggleListMonth = (value: boolean, selectedMonth: number = 0, cicilan: number = 0) => {
    this.setState({ showListMonth: value, selectedMonth, showListBank: false, cicilan });
  };
  listDataMonth = () => {
    const bank = installments.find(i => i.bankName === this.state.bankName);
    return (
      <View style={styles.filterDropdownMonthContainer}>
        <View style={styles.centilanContainer}>
          <Image source={require('./assets/triangle.png')} />
        </View>
        <View style={styles.optionsContainer}>
          {Object.keys(bank.term).map((b, bIndex) => {
            const month = parseInt(b);
            const cicilan = bank.term[b];
            const noBorder =
              Object.keys(bank.term).length - 1 === bIndex ? styles.noBorderBottom : null;
            return (
              <TouchableWithoutFeedback
                key={b + '-' + bIndex}
                onPress={() => {
                  this.toggleListMonth(false, month, cicilan);
                }}
              >
                <View style={[styles.sortContainer, noBorder]}>
                  <View style={styles.sectionSortContainer}>
                    <Text style={styles.textSort}>{month} Bulan</Text>
                  </View>
                  {this.state.selectedMonth === month && this.checkSelectedSortBy()}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  };
  checkSelectedSortBy = () => (
    <View style={styles.checkContainer}>
      <Image source={require('./assets/check.png')} width={24} height={24} style={styles.check} />
    </View>
  );
  selectOutlet = (outletLocation: string, stockAvailable: number) => {
    this.setState({ outletLocation, stockAvailable });
  };
  render() {
    const { product, loading, specification } = this.state;
    const productImage = this.productImage();

    if (loading) {
      return <ActivityIndicator color={config.color.blue} />;
    }

    const totalCicilan = numberFormat(this.state.cicilan);
    const headerLeftColumn = (
      <View style={styles.headerStyleCustom}>
        <View style={styles.headerCategoryContainer}>
          <View style={styles.buttonBackCategoryContainer}>
            <TouchableWithoutFeedback onPress={this.backCategory}>
              <View style={styles.backCategory}>
                <Image source={require('./assets/backArrow.png')} />
                <Text style={styles.backCategoryText}>Kategori</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.titleCategoryContainer}>
            <View style={styles.titleCategory}>
              <Text style={styles.titleCategoryName}>Detail Produk</Text>
            </View>
          </View>
        </View>
      </View>
    );

    const leftColumn = (
      <View style={styles.container}>
        {headerLeftColumn}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={!this.state.showListBank && !this.state.showListMonth}
        >
          <View style={styles.content}>
            <View style={styles.productImageContainer}>{productImage}</View>
            {this.state.showListBank && this.listDataBank()}
            {this.state.showListMonth && this.listDataMonth()}
            <Text style={styles.productTitle}>{product.fullName}</Text>
            <View style={styles.productCategorySku}>
              <Text style={styles.categoryText}>
                {product.brandName} . {product.categoryName}
              </Text>
              <View style={styles.skuRating}>
                <Text style={styles.skuText}>{product.sku}</Text>
                <Rating totalRating={product.rating} totalReview={product.totalReview} />
              </View>
            </View>
            {product.price && (
              <Price
                normalPrice={product.price.bhinneka.normalPrice}
                specialPrice={product.price.bhinneka.specialPrice}
                offerStatus={product.offerStatus}
              />
            )}
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/bank.png')} style={{ marginRight: 8 }} />
                <Text style={styles.cicilanText}>
                  Simulasi cicilan: <Text style={styles.bold}>Rp {totalCicilan} / bulan</Text>
                </Text>
              </View>
              <View style={[styles.rowContentContainer, { flexDirection: 'row' }]}>
                <TouchableWithoutFeedback
                  onPress={() => this.toggleListBank(!this.state.showListBank, this.state.bankName)}
                >
                  <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownTextContainer}>
                      <Text style={styles.dropdownText}>
                        {this.state.bankName === '' ? 'Pilih' : this.state.bankName}
                      </Text>
                    </View>
                    <View style={styles.dropdownIconContainer}>
                      <Image
                        source={require('./assets/chevronDown.png')}
                        style={styles.dropdownIcon}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  disabled={this.state.bankName === ''}
                  onPress={() =>
                    this.toggleListMonth(
                      !this.state.showListMonth,
                      this.state.selectedMonth,
                      totalCicilan,
                    )
                  }
                >
                  <View
                    style={[
                      styles.dropdownTime,
                      this.state.bankName === '' ? { backgroundColor: config.color.border } : null,
                    ]}
                  >
                    <View style={styles.dropdownTextContainer}>
                      <Text style={styles.dropdownText}>{this.state.selectedMonth}</Text>
                    </View>
                    <View style={styles.dropdownIconContainer}>
                      <Image
                        source={require('./assets/chevronDown.png')}
                        style={[styles.dropdownIcon, { marginRight: 32 }]}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/list.png')} style={styles.iconSection} />
                <Text style={styles.textSectionTitle}>Deskripsi</Text>
              </View>
              <View style={styles.rowContentContainer}>
                <Text>{product.description}</Text>
              </View>
            </View>
            {product.warranty && (
              <View style={styles.rowSectionContainer}>
                <View style={styles.rowTitleSectionContainer}>
                  <Image source={require('./assets/verified.png')} style={styles.iconSection} />
                  <Text style={styles.textSectionTitle}>Garansi</Text>
                </View>
                <View style={styles.rowContentContainer}>
                  <Text style={styles.contentSection}>{product.warranty}</Text>
                </View>
              </View>
            )}
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/warehouse.png')} style={styles.iconSection} />
                <Text style={styles.textSectionTitle}>Stok</Text>
              </View>
              {this.state.variant && (
                <StokList stocks={this.state.variant.stock} onSelect={this.selectOutlet} />
              )}
              {this.state.stockAvailable === 0 && (
                <View style={styles.buttonStokHabis}>
                  <Text style={styles.textButtonStokHabis}>STOK HABIS</Text>
                </View>
              )}
              {this.state.stockAvailable > 0 && (
                <TouchableWithoutFeedback onPress={() => Alert.alert('beli')}>
                  <View style={styles.buttonStokTersedia}>
                    <Text style={styles.textButtonStokTersedia}>BELI</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
            <View style={styles.rowSectionContainerNoBorder}>
              <ProductDescription
                productDescription={product.description}
                productSpecification={specification}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
    const rightColumn = <View />;
    if (loading === false) {
      return <Layout leftColumn={leftColumn} rightColumn={rightColumn} />;
    } else {
      return <ActivityIndicator color={config.color.blue} />;
    }
  }
}

export default { PageProductDetailComponent };
