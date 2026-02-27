import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '@/App.vue'

describe('App.vue', () => {
  beforeEach(() => {
    const storage: Record<string, string> = {}
    
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] || null,
      setItem: (key: string, value: string) => { storage[key] = value },
      clear: () => { 
        Object.keys(storage).forEach(key => delete storage[key]) 
      },
      removeItem: (key: string) => delete storage[key],
      length: 0,
      key: (index: number) => Object.keys(storage)[index] || null
    })
  })

  it('automatically focuses the input on mount (Template Ref)', () => {
    const wrapper = mount(App, { 
      attachTo: document.body 
    })
    
    const input = wrapper.find('input[placeholder="What needs to be done?"]').element as HTMLInputElement
    
    expect(input).toBe(document.activeElement)
    
    wrapper.unmount()
  })

  it('calculates completion stats (Computed Function)', async () => {
    const wrapper = mount(App)
    
    const input = wrapper.find('input')
    await input.setValue('TypeScript Task')
    await wrapper.find('form').trigger('submit.prevent')

    const taskTitle = wrapper.find('.task-title')
    await taskTitle.trigger('click')

    expect(wrapper.text()).toContain('1 / 1 Done')
  })

  it('filters tasks based on search query (Computed Function)', async () => {
    const wrapper = mount(App)
    
    const input = wrapper.find('input')
    
    await input.setValue('Apple')
    await wrapper.find('form').trigger('submit.prevent')
    
    await input.setValue('Banana')
    await wrapper.find('form').trigger('submit.prevent')

    const searchInput = wrapper.find('input.search-bar')
    await searchInput.setValue('App')

    expect(wrapper.text()).toContain('Apple')
    expect(wrapper.text()).not.toContain('Banana')
  })

  it('persists data when tasks change (Watcher)', async () => {
    const setItemSpy = vi.spyOn(localStorage, 'setItem')
    const wrapper = mount(App)

    const input = wrapper.find('input')
    await input.setValue('Save Me')
    await wrapper.find('form').trigger('submit.prevent')

    expect(setItemSpy).toHaveBeenCalledWith('my-tasks', expect.stringContaining('Save Me'))
  })
})