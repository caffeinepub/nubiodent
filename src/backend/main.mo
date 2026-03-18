import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

actor {
  // Types
  type ProductId = Nat;
  type Category = Text;

  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    category : Category;
    price : Float;
    imageUrl : Text;
    featured : Bool;
    rating : Float;
    inStock : Bool;
  };

  type CartItem = {
    productId : ProductId;
    quantity : Nat;
  };

  // Categories
  let categories : [Category] = [
    "Dental Chairs",
    "Imaging & X-Ray",
    "Sterilization",
    "Handpieces",
    "Instruments",
  ];

  // ProductId generator
  var nextProductId = 0;

  // Product store
  let productStore = Map.empty<ProductId, Product>();

  // User cart and wishlist store
  let cartStore = Map.empty<Principal, Map.Map<ProductId, Nat>>(); // productId -> quantity
  let wishlistStore = Map.empty<Principal, Map.Map<ProductId, ()>>();

  // Product compator
  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  // Initialize sample data
  public shared ({ caller }) func initialize() : async Bool {
    if (productStore.isEmpty()) {
      addSampleProduct(
        "A-dec 500 Chair",
        "Premium dental chair with ergonomic design",
        "Dental Chairs",
        12900.0,
        "https://images.unsplash.com/photo-1636212302131-73ef0552b0cf",
        true,
        4.8,
        true,
      );
      addSampleProduct(
        "Carestream CS 8100",
        "Digital panoramic imaging system",
        "Imaging & X-Ray",
        18750.0,
        "https://images.unsplash.com/photo-1636212300237-6af98f2cf246",
        true,
        4.7,
        true,
      );
      addSampleProduct(
        "Midmark M11 AutoClave",
        "Automatic sterilizer with large chamber",
        "Sterilization",
        6995.0,
        "https://images.unsplash.com/photo-1636212300702-b89dbddcd2c8",
        false,
        4.6,
        true,
      );
      addSampleProduct(
        "Kavo Mastertorque LUX",
        "High-speed air-driven dental handpiece",
        "Handpieces",
        1299.0,
        "https://images.unsplash.com/photo-1631734487888-498ae6756213",
        false,
        4.9,
        true,
      );
      addSampleProduct(
        "Hu-Friedy Scaler Set",
        "Premium stainless steel dental instruments",
        "Instruments",
        425.0,
        "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c",
        true,
        4.8,
        true,
      );
      addSampleProduct(
        "Belmont Clesta eIII Chair",
        "Comfortable and affordable dental chair",
        "Dental Chairs",
        7995.0,
        "https://images.unsplash.com/photo-1510180417150-dca92a7d7a3c",
        false,
        4.5,
        true,
      );
      addSampleProduct(
        "Sirona Orthophos SL 3D",
        "Advanced 3D imaging system for dental clinics",
        "Imaging & X-Ray",
        37900.0,
        "https://plus.unsplash.com/premium_photo-1664360847386-64c38f25b74a",
        true,
        4.9,
        true,
      );
      addSampleProduct(
        "Tuttnauer EZ10P",
        "Fully automatic pressure sterilizer",
        "Sterilization",
        8850.0,
        "https://images.unsplash.com/photo-1552039374-c0fd66649886",
        false,
        4.6,
        true,
      );
    };
    true;
  };

  func addSampleProduct(name : Text, description : Text, category : Category, price : Float, imageUrl : Text, featured : Bool, rating : Float, inStock : Bool) {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      category;
      price;
      imageUrl;
      featured;
      rating;
      inStock;
    };

    nextProductId += 1;
    productStore.add(product.id, product);
  };

  // Product CRUD operations
  public shared ({ caller }) func addProduct(name : Text, description : Text, category : Category, price : Float, imageUrl : Text, featured : Bool, rating : Float, inStock : Bool) : async ProductId {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      category;
      price;
      imageUrl;
      featured;
      rating;
      inStock;
    };

    nextProductId += 1;
    productStore.add(product.id, product);
    product.id;
  };

  public shared ({ caller }) func updateProduct(productId : ProductId, name : Text, description : Text, category : Category, price : Float, imageUrl : Text, featured : Bool, rating : Float, inStock : Bool) : async Bool {
    switch (productStore.get(productId)) {
      case (null) { false };
      case (?_) {
        let updatedProduct : Product = {
          id = productId;
          name;
          description;
          category;
          price;
          imageUrl;
          featured;
          rating;
          inStock;
        };
        productStore.add(productId, updatedProduct);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : ProductId) : async Bool {
    if (productStore.containsKey(productId)) {
      productStore.remove(productId);
      true;
    } else {
      false;
    };
  };

  // Product queries
  public query ({ caller }) func getAllProducts() : async [Product] {
    productStore.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    productStore.values().toArray().filter(
      func(product) { product.category == category }
    );
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    productStore.values().toArray().filter(
      func(product) { product.featured }
    );
  };

  public query ({ caller }) func getProductById(productId : ProductId) : async ?Product {
    productStore.get(productId);
  };

  // Cart management
  public shared ({ caller }) func addToCart(productId : ProductId, quantity : Nat) : async () {
    let userCart = switch (cartStore.get(caller)) {
      case (null) { Map.empty<ProductId, Nat>() };
      case (?cart) { cart };
    };

    let currentQuantity = switch (userCart.get(productId)) {
      case (null) { 0 };
      case (?qty) { qty };
    };

    userCart.add(productId, currentQuantity + quantity);
    cartStore.add(caller, userCart);
  };

  public shared ({ caller }) func removeFromCart(productId : ProductId) : async () {
    switch (cartStore.get(caller)) {
      case (null) {};
      case (?cart) {
        cart.remove(productId);
        cartStore.add(caller, cart);
      };
    };
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (cartStore.get(caller)) {
      case (null) { [] };
      case (?cart) {
        cart.entries().toArray().map(
          func((productId, quantity)) {
            {
              productId;
              quantity;
            };
          }
        );
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    cartStore.remove(caller);
  };

  // Wishlist management
  public shared ({ caller }) func addToWishlist(productId : ProductId) : async () {
    let userWishlist = switch (wishlistStore.get(caller)) {
      case (null) { Map.empty<ProductId, ()>() };
      case (?wishlist) { wishlist };
    };

    userWishlist.add(productId, ());
    wishlistStore.add(caller, userWishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : ProductId) : async () {
    switch (wishlistStore.get(caller)) {
      case (null) {};
      case (?wishlist) {
        wishlist.remove(productId);
        wishlistStore.add(caller, wishlist);
      };
    };
  };

  public query ({ caller }) func getWishlist() : async [ProductId] {
    switch (wishlistStore.get(caller)) {
      case (null) { [] };
      case (?wishlist) {
        wishlist.keys().toArray();
      };
    };
  };
};
