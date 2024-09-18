export default class OrderItem {
   private _id: string;
   private _productId: string;
   private _name: string;
   private _price: number;
   private _quantity: number = 1;

    constructor(id: string, productId: string,name: string, price: number, quantity: number){
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    get quantity(): number {
        return this._quantity
    }

    get productId(): string {
        return this._productId
    }

    changeQuantity(quantity: number): void {
        this._quantity = quantity;        
      }
    
    orderItemTotal(): number {
        return this._price * this._quantity;
      }


}