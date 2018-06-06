/**
 * Bhinneka business package library
 *
 * Author:
 * - @rofiq
 */
import { plainToClass } from 'class-transformer';

interface Spec {
  id: string;
  name: string;
  slug: string;
  value: string;
}

export class Product {
  productId: string;
  productName: string;
  productDescription: string[];
  productSpecs: Spec[];
  productStatus: string;
  productModel: string;
  productIsComplement: boolean;
  productCategory: { id: string; name: string; slug: string };
  productBrand: {
    id: string;
    name: string;
    slug: string;
    imageSmall: string;
    imageMedium: string;
    imageLarge: string;
  };
  variantId: string;
  variantName: string;
  variantFullname: string;
  variantStatus: string;
  variantPrice: number;
  variantSkuNo: string;
  variantImageMedium: string;
  variantImageSmall: string;
  variantImageThumbnail: string;
  variantIsBhinneka: boolean;
  offerId: string;
  offerInfo: string;
  offerNormalPrice: number;
  offerSpecialPrice: number;
  offerSpecialPriceIsActive: boolean;
  offerDiscountPercentage: number;
  offerStatus: string;
  offerSpecialPriceStartDate: string;
  offerSpecialPriceEndDate: string;

  get isOutofStock(): boolean {
    return this.variantPrice === 0 && this.offerStatus !== 'active';
  }

  get isDiscount(): boolean {
    return this.offerSpecialPriceIsActive && this.offerDiscountPercentage > 0;
  }

  public static fromPlain(data: any) {
    return plainToClass(Product, data);
  }
}

export class Offer {
  id: string;
  merchant: any;
  merchantId: number; // 1 - bhinneka
  conditionId: number;
  conditionName: string;
  conditionNote: string;
  vplPrice: number;
  vplSuggestedPrice: number;
  normalPrice: number;
  discountType: string;
  discountValue: number;
  specialPrice: number;
  specialPriceStartDate: string;
  specialPriceEndDate: string;
  warrantyTypeId: number;
  warrantyTypeName: string;
  warrantyPeriodId: number;
  warrantyPeriodName: string;
  stockMerchant: number;
  offerStatus: string;

  public static fromPlain(data: any) {
    return plainToClass(Offer, data);
  }
}

export class Stock {
  available: number;
  locationCode: string;
  name: string;
  onHand: number;
  onReserve: number;

  get isStore(): boolean {
    return ['GSR'].indexOf(this.locationCode) > -1;
  }
}

export class Variant {
  id: string;
  fullname: string;
  skuNo: string;
  status: string;
  isBhinneka: boolean;
  vendor: { id: string; name: string; primary: boolean };
  stock: Stock[];

  public static fromPlain(data: any) {
    return plainToClass(Variant, data);
  }
}

export class Installment {
  id: number;
  method: string;
  name: string;
  image: string;
  bankName: string;
  bankCode: string;
  currency: string;
  term: { [month: string]: string };
}

export class Category {
  id: string;
  name: string;
  docCount: string;
  level: number;
  children?: Category[];

  public static fromPlain(data: any) {
    return plainToClass(Category, data);
  }
}

export class Brand {
  aggrBrands: string;
  brand: string;
  docCount: string;

  public static fromPlain(data: any) {
    return plainToClass(Brand, data);
  }
}
