import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import Address from "../value-object/address";


export default class Customer {
   private _id: string;
   private _name: string;
   private _address!: Address;
   private _active: boolean = false;
   private _rewardPoints: number = 0;

   private eventDispatcher: EventDispatcher | null;

    constructor(id: string, name: string, eventDispacher: EventDispatcher | null = null){
        this._id = id;
        this._name = name;
        this.validate();
        this.eventDispatcher = eventDispacher;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
      }

    isActive(): boolean {
        return this._active;
    }

    validate(){
        if (this._id.length == 0){
            throw new Error("Id is required");
        }
        
        if(this._name.length == 0){
            throw new Error("Name is required");
        }

        

        return true;
    }   

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address){
        this._address = address;
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: this.id,
            name: this.name,
            address: this._address
        });
        if (this.eventDispatcher) {
            this.eventDispatcher.notify(customerAddressChangedEvent);
        }
    }

    activate(){
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customers");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;
    }

}