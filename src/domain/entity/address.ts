export default class Address {   
    _street: string ="";
    _number: number = 0;        
    _zip: string = "";
    _city: string = "";
   

    constructor(street: string, city: string, zip: string, number: number) {        
        this._street = street;
        this._city = city;        
        this._zip = zip;   
        this.validate()
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get zip(): string {
        return this._zip;
    }

    get number(): number {
        return this._number;
    }

    validate(){
        if (this._street.length == 0) {
            return false;
        }
        if (this._city.length == 0) {
            return false;
        }
        if (this._zip.length == 0) {
            return false;
        }   
    }

    toString(): string {
        return `${this._street}, ${this._city}, ${this._zip}`;
    }
}