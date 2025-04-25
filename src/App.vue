<template>
  <div class="app">
    <ErrorBoundary>
      <TodoHeader />
      <router-view />
      <TodoFooter />
    </ErrorBoundary>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TodoHeader from './components/Header.vue';
import TodoFooter from './components/Footer.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';

export default defineComponent({
  name: 'App',
  components: {
    TodoHeader,
    TodoFooter,
    ErrorBoundary
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #2d3748;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

