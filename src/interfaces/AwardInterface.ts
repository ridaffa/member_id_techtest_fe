import { IProduct } from './ProductInterface';
import { IVoucher } from './VoucherInterface';
import { IAwardType } from "./AwardTypeInterface";

export interface IAward {
  id: number;
  points: number;
  image: string;
  award_type: IAwardType;
  voucher?: IVoucher;
  product?: IProduct;
}