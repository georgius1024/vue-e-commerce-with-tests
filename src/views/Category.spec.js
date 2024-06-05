import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import component from "@/views/Category.vue";
import router from "@/router";

vi.mock("@/services/products", () => ({
  default: vi.fn().mockResolvedValue({
    products: [
      {
        id: 101,
        title: "product-1",
        category: 'category',
        thumbnail: null,
        description: "Lorem ipsum 1",
        price: 100,
      },
      {
        id: 102,
        title: "product-2",
        category: 'category',
        thumbnail: null,
        description: "Lorem ipsum 2",
        price: 200,
      },
      {
        id: 103,
        title: "product-3",
        category: 'category',
        thumbnail: null,
        description: "Lorem ipsum 3",
        price: 300,
      },
    ],
  }),
}));

describe("Category page", () => {
  beforeEach(async () => {
    router.push("/");
    await router.isReady();
  });
  const buildWrapper = () => {
    const propsData = { category: "General-Products" };

    return mount(component, {
      propsData,
      global: {
        plugins: [router],
      },
    });
  };
  it("mounts without error", async () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.html()).toContain("100");
    expect(wrapper.html()).toContain("product-3");
  });

  it("click on product preview navigates to product", async () => {
    const push = vi.spyOn(router, "push");
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    await flushPromises();
    await wrapper.find('[data-testid="product-preview-101"').trigger("click");
    expect(push).toBeCalled();
  });
});
