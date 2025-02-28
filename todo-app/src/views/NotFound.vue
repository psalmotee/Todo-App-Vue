<template>
  <div class="container">
    <div class="not-found">
      <h1 class="heading">404 - Page Not Found</h1>
      <p class="text">Sorry, the page you are looking for does not exist.</p>
      <router-link to="/">
        <button class="button">Go Back to Homepage</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.container {
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.heading {
  font-size: 2.25rem;
  font-weight: 700;
  color: #e53e3e;
}

.text {
  font-size: 1.25rem;
  text-align: center;
}

.button {
  background-color: #319795;
  color: white;
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2c7a7b;
}
</style>
