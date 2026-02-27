<template>
  <div class="app-container">
    <h1>Smart Task Dashboard</h1>

    <BaseCard>
      <template #header>
        <h2>Add a New Task</h2>
      </template>
      
      <form @submit.prevent="addTask" class="add-form">
        <input 
          ref="taskInput" 
          v-model="newTaskTitle" 
          placeholder="What needs to be done?" 
        />
        <button type="submit" :disabled="!newTaskTitle.trim()">Add</button>
      </form>
    </BaseCard>

    <BaseCard>
      <template #header>
        <h2>Your Tasks ({{ completedCount }} / {{ tasks.length }} Done)</h2>
      </template>

      <input 
        v-model="searchQuery" 
        placeholder="Search tasks..." 
        class="search-bar"
      />

      <p v-if="filteredTasks.length === 0" class="empty-state">
        No tasks found. Try a different search!
      </p>

      <ul v-else class="task-list">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggleStatus="toggleTask(task.id)"
          @deleteTask="deleteTask(task.id)"
        />
      </ul>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import BaseCard from './components/BaseCard.vue';
import TaskItem from './components/TaskItem.vue';

const tasks = ref([]);
const newTaskTitle = ref('');
const searchQuery = ref('');

const taskInput = ref(null);

onMounted(() => {
  taskInput.value.focus();
  
  const savedTasks = localStorage.getItem('my-tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});


watch(tasks, (newTasks) => {
  localStorage.setItem('my-tasks', JSON.stringify(newTasks));
}, { deep: true });

const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return tasks.value.filter(task => task.title.toLowerCase().includes(query));
});

const completedCount = computed(() => {
  return tasks.value.filter(task => task.completed).length;
});

const addTask = () => {
  if (!newTaskTitle.value.trim()) return;
  
  tasks.value.push({
    id: Date.now(),
    title: newTaskTitle.value,
    completed: false
  });
  
  newTaskTitle.value = '';
};

const toggleTask = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
};

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId);
};
</script>

<style scoped>
.app-container { max-width: 500px; margin: 0 auto; font-family: sans-serif; }
.add-form { display: flex; gap: 10px; }
.add-form input { flex: 1; padding: 8px; }
.search-bar { width: 100%; padding: 8px; margin-bottom: 15px; box-sizing: border-box;}
.task-list { list-style: none; padding: 0; margin: 0; }
.empty-state { color: #666; font-style: italic; }
</style>