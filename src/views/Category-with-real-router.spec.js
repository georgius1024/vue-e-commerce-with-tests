import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import component from "@/views/Category.vue";
import router from "@/router";

vi.mock("@/services/products", () => ({
  default: vi.fn().mockResolvedValue({
    products: global.productsMock,
  }),
}));

describe("Category page with real router", () => {
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
