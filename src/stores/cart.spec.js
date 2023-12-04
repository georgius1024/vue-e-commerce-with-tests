import { describe, it, expect, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { useCartStore } from "@/stores/cart";

describe("Cart store", () => {
  const product= {
    id: 101,
    title: "product",
    thumbnail: null,
    description: "Lorem ipsum",
    price: 100,
  }
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('store is empty initially', () => {
    const store = useCartStore();
    expect(store.size).toBe(0);
    expect(store.cart).toHaveLength(0);
  })
  it("add product works", async () => {
    const store = useCartStore();
    store.add(product)
    expect(store.size).toBe(1);
    expect(store.cart).toHaveLength(1);
    expect(store.cart).toHaveProperty('0.id', product.id);
  });
  it("remove product works", async () => {
    const store = useCartStore();
    store.add(product)
    store.remove(product)
    expect(store.size).toBe(0);
    expect(store.cart).toHaveLength(0);
  });
  describe('inCart', () => {
    it("works on empty store", async () => {
      const store = useCartStore();
      expect(store.inCart(product.id)).toBeFalsy();
    });
    it("works when product is added", async () => {
      const store = useCartStore();
      store.add(product)
      expect(store.inCart(product.id)).toBeTruthy();
    });
    it("works when product is added and removed again", async () => {
      const store = useCartStore();
      store.add(product)
      store.remove(product)
      expect(store.inCart(product.id)).toBeFalsy();
    });
  })
});
