<template>
  <slot v-if="!hasError"></slot>
  <div v-else class="error-container">
    <h2 class="error-heading">Oops! Something went wrong.</h2>
    <p class="error-message">
      We are sorry for the inconvenience. Our team has been notified and is working on the issue.
    </p>
    <p class="error-details">Error: {{ errorMessage }}</p>
    <button class="error-button" @click="goHome">Go Back to Homepage</button>
  </div>
</template>

<script>
import { ref, onErrorCaptured } from 'vue'

export default {
  name: 'ErrorBoundary',
  setup() {
    const hasError = ref(false)
    const errorMessage = ref('')

    onErrorCaptured((error) => {
      hasError.value = true
      errorMessage.value = error.toString()

      // Prevent the error from being displayed in the console
      console.error = () => {}
      console.warn = () => {}

      return true // Prevent the error from propagating further
    })

    const goHome = () => {
      window.location.href = '/'
    }

    return {
      hasError,
      errorMessage,
      goHome,
    }
  },
}
</script>

<style scoped>
.error-container {
  text-align: center;
  padding: 2.5rem 1.5rem;
}

.error-heading {
  display: inline-block;
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(to right, #38b2ac, #319795);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.error-message {
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  color: #718096;
}

.error-details {
  color: #718096;
  margin-bottom: 1.5rem;
}

.error-button {
  background: linear-gradient(to right, #38b2ac, #319795, #2c7a7b);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.error-button:hover {
  opacity: 0.9;
}
</style>
