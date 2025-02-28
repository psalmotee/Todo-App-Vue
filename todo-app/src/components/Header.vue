<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="header-link">
        <h1 class="header-title">Todo App</h1>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.header {
  background-color: #319795;
  color: white;
  padding: 1rem 0;
}

.header-content {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-link {
  text-decoration: none;
  color: white;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
