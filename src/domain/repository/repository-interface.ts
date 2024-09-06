export default interface RepositoryInterface<T> {

    create(item: T): Promise<void>;
    update(item: T): Promise<void>;    
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;

}