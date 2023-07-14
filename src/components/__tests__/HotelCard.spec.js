import HotelCard from '../HotelCard.vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe('HotelCard', () => {
  it('renders properly', () => {
    const wrapper = mount(HotelCard, {
      props: {
        hotel: {
          id: 1,
          name: 'Lakewood',
          rating: 3,
          weekday_regular_price: 110,
          weekday_rewards_price: 80,
          weekend_regular_price: 90,
          weekend_rewards_price: 80
        }
      }
    })
    expect(wrapper.text()).toContain('Lakewood')
    expect(wrapper.text()).toContain('⭐️⭐️⭐️')
    expect(wrapper.text()).toContain('110')
    expect(wrapper.text()).toContain('80')
    expect(wrapper.text()).toContain('90')
    expect(wrapper.text()).toContain('80')
  })
})
