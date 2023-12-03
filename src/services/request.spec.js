import { describe, it, expect } from "vitest";

import testSubject from '@/services/request'

describe('request service', () => {
  it('imports without errors', () => {
    expect(testSubject).toBeDefined()
    expect(testSubject).toBeTypeOf('function')
  })
})