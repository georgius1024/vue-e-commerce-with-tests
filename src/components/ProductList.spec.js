import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import component from "@/components/ProductList.vue";

vitest.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
}));

const push = vi.fn();
useRouter.mockImplementation(() => ({
  push,
}));

describe("Product List", () => {
  const buildWrapper = () => {
    const propsData = {
      products: [
        {
          id: 101,
          title: "product",
          thumbnail: null,
          description: "Lorem ipsum",
          price: 100,
        },
      ],
    };
    return mount(component, {
      propsData,
    });
  };
  it("mounts without error", () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("navigates on product click", async () => {
    const wrapper = buildWrapper();
    await wrapper.find('[data-testid="product-preview-101"').trigger("click");
    expect(push).toHaveBeenCalled();
  });
});
