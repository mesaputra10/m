/**
 * Bhinneka business package library
 *
 * Author:
 * - @rofiq
 */
import { plainToClass } from 'class-transformer';

export class Product {
  productId: string;
  productName: string;
  offerId: string;
  offerNormalPrice: number;
  variantId: string;
  variantPrice: number;
  variantSkuNo: string;
  variantImageThumbnail: string;
  offerSpecialPrice: number;
  offerSpecialPriceIsActive: boolean;
  offerDiscountPercentage: number;
  offerStatus: string;

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

export class Variant {
  id: string;
  fullname: string;
  skuNo: string;
  status: string;
  isBhinneka: boolean;
  vendor: { id: string; name: string; primary: boolean };
  stock: [
    { available: number; locationCode: string; name: string; onHand: number; onReserve: number }
  ];

  public static fromPlain(data: any) {
    return plainToClass(Variant, data);
  }
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
