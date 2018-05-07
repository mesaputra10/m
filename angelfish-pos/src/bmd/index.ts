/**
 * Bhinneka business package library
 *
 * Author:
 * - @rofiq
 */
import { plainToClass } from 'class-transformer';

export class Category {
  id: string;
  name: string;
  docCount: string;
  children?: Category[];

  public static fromJSON(data: any) {
    return plainToClass(Category, data);
  }
}
