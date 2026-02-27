<template>
  <div class="card">
    <header class="card-header">
      <slot name="header">Default Header</slot>
    </header>
    
    <main class="card-body">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}
.card-header {
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
  padding-bottom: 8px;
}
</style>