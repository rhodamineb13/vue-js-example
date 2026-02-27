import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TaskItem from '@/components/TaskItem.vue'

describe('TaskItem.vue', () => {
  const task = { id: 101, title: 'Task for Testing', completed: false }

  it('binds the correct CSS class based on completion status', async () => {
    const wrapper = mount(TaskItem, { props: { task } })
    
    // Check initial state
    expect(wrapper.classes()).not.toContain('is-completed')

    // Re-mount or setProps to check "true" state
    await wrapper.setProps({ task: { ...task, completed: true } })
    expect(wrapper.classes()).toContain('is-completed')
  })

  it('emits events to parent when interacted with', async () => {
    const wrapper = mount(TaskItem, { props: { task } })

    // 12. Emitted Events: Click the title
    await wrapper.find('.task-title').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('toggleStatus')

    // Click the delete button
    await wrapper.find('.delete-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('deleteTask')
  })
})