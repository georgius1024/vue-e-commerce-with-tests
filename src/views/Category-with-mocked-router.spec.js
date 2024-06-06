import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { RouterLinkStub } from '@vue/test-utils'
import component from "@/views/Category.vue";
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

vi.mock("@/services/products", () => ({
  default: vi.fn().mockResolvedValue({
    products: global.productsMock,
  }),
}));

describe("Category page with mocked router", () => {
  const buildWrapper = () => {
    return mount(component, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
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
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    await flushPromises();
    await wrapper.find('[data-testid="product-preview-101"').trigger("click");
    expect(push).toBeCalled();
  });
});
