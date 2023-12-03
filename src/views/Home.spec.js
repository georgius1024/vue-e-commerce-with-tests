import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import component from "@/views/Home.vue";
import router from "@/router";

vi.mock("@/services/categories", () => ({
  default: vi.fn().mockResolvedValue(global.servicesMock),
}));

describe("Home page", () => {
  const buildWrapper = () => {
    return mount(component, {
      global: {
        plugins: [router],
      },
    });
  };
  it("mounts without error", async () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("use service to obtain data", async () => {
    const wrapper = buildWrapper();
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
    global.servicesMock.forEach(name => expect(wrapper.html()).toContain(name))
  });
});
