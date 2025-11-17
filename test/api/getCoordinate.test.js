import { describe, test, expect, beforeEach, vi } from 'vitest'
import Location, { getCoordinates } from '../../src/Services/Location.js'

global.fetch = vi.fn()

describe('getCoordinate', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('주소를 좌표로 변환한다', async () => {
    const location = new Location();
    const result = await location.getCoordinate('부산광역시 부산진구 가야대로679번길 155')
    
    expect(result).toEqual({
      lat: 35.1556470658,
      lng: 129.0384828426
    })
  })
})