import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import component from "@/components/ProductPreview.vue";

describe("Product preview", () => {
  const buildWrapper = () => {
    const propsData = {
      product: {
        id: 101,
        title: "product",
        thumbnail: null,
        description: "Lorem ipsum",
        price: 100,
      },
    };
    return mount(component, {
      propsData,
    });
  };
  it("mounts without error",  () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("click on product emits", async () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    await wrapper.find('[data-testid="product-preview-101"').trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});
