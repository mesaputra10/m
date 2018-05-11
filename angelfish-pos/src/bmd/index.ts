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
  offerNormalPrice: number;
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
