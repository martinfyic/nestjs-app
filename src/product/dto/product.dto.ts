export class CreateProductDTO {
  readonly title: string;
  readonly price: number;
  readonly imageURL: string;
  readonly description: string;
  readonly stock: number;
  readonly createdAt: Date;
}
