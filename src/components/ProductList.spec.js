import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { useRouter, useRoute } from "vue-router";
import component from "@/components/ProductList.vue";

vi.mock("vue-router");

const push = vi.fn();
useRouter.mockImplementation(() => ({
  push,
}));

useRoute.mockImplementation(() => ({
  params: { category: "c1" },
  name: "category",
  query: { page: 1 },
}));

describe("Product List", () => {
  const buildWrapper = () => {
    const propsData = {
      products: global.productsMock,
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
