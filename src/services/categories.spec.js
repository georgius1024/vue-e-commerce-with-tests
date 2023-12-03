import { describe, it, expect } from "vitest";

import testSubject from '@/services/categories'

vi.mock('@/services/request', () => ({
  default:  {
    get: vi.fn().mockResolvedValue({data: ['category 1', 'category 2']})
  }
}));
describe('categories service', () => {
  it('imports without errors', () => {
    expect(testSubject).toBeDefined()
    expect(testSubject).toBeTypeOf('function')
  })
  it('requests backend when called', async () => {
    const categories = await testSubject()
    expect(categories).toEqual(['category 1', 'category 2'])
  })
})
