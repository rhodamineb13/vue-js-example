<template>
    <li class="task-item" :class="{ 'is-completed': task.completed }">      
      <span class="task-title" @click="$emit('toggleStatus')">
        {{ task.title }}
      </span>
      <div class="buttons">
        <button @click="$emit('toggleStatus')" class="complete-btn">Set complete</button>
        <button @click="$emit('deleteTask')" class="delete-btn">Delete</button>
      </div>
    </li>
  </template>
  
  <script setup>
  defineProps({
    task: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['toggleStatus', 'deleteTask']);
  </script>
  
  <style scoped>
  .task-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
  .is-completed .task-title {
    text-decoration: line-through;
    color: gray;
  }
  .task-title {
    cursor: pointer;
  }
  .delete-btn {
    background: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .buttons {
    display: flex;
    gap: 15px;
  }
  </style>