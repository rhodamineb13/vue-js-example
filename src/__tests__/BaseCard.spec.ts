import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseCard from '@/components/BaseCard.vue'

describe('BaseCard.vue', () => {
  it('renders content in the header and default slots', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        header: '<h1>Card Title</h1>',
        default: '<div id="content">Main Body</div>'
      }
    })

    expect(wrapper.find('header').html()).toContain('<h1>Card Title</h1>')
    expect(wrapper.find('#content').exists()).toBe(true)
  })
})