<template>
  <div class="app">
    <ErrorBoundary>
      <Header />
      <router-view />
      <Footer />
    </ErrorBoundary>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
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

