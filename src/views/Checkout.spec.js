import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "@/stores/cart";
import component from "@/views/Checkout.vue";

describe("Checkout page", () => {
  const products = global.productsMock
  const buildWrapper = () => {
    return mount(component);
  };
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useCartStore();
    products.forEach(product => store.add(product))
  });
  it("mounts without error",  () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("click on remove control calls store action", async () => {
    const store = useCartStore();
    const remove = vi.spyOn(store, 'remove')
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    await wrapper.find('[data-testid="remove-product-101"').trigger("click");
    expect(remove).toHaveBeenCalled()
  });

  it("click on remove control removes product", async () => {
    const wrapper = buildWrapper();
    expect(wrapper.findAll('li')).toHaveLength(3)
    await wrapper.find('[data-testid="remove-product-101"').trigger("click");
    expect(wrapper.findAll('li')).toHaveLength(2)
  });

  it("click on checkout calls global method", async () => {
    const wrapper = buildWrapper();
    const alert = vi.fn()
    global.alert = alert    
    await wrapper.find('.btn-primary').trigger("click");
    expect(alert).toHaveBeenCalled()
  });

});
