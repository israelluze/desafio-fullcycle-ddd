import ProductFactory from "./product.factory";

describe('ProductFactory unit test', () => {

  it('should create a product type a', () => {
    
    const product = ProductFactory.create('a', 'Product 1', 100);
    
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a product type b', () => {
    
    const product = ProductFactory.create('b', 'Product B', 1);
    
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe('ProductB');
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create('c', 'Product C', 100)).toThrow("Product type not supported");
  });

});
