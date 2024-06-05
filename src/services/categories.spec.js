import { describe, it, expect } from "vitest";
import request from "@/services/request";
import testSubject from '@/services/categories'

vi.mock('@/services/request', () => ({
  default:  {
    get: vi.fn().mockResolvedValue({data: global.servicesMock})
  }
}));
describe('categories service', () => {
  it('imports without errors', () => {
    expect(testSubject).toBeDefined()
    expect(testSubject).toBeTypeOf('function')
  })
  it('requests backend when called', async () => {
    const quiery = vi.spyOn(request, 'get')
    const categories = await testSubject()
    expect(categories.map(e => e.name)).toEqual(['category 1', 'category 2'])
    expect(quiery).toBeCalled()
  })
})
