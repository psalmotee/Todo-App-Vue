<template>
  <div>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>
    <div v-else-if="!todo" class="container">
      <div class="todo-not-found">
        <h2 class="heading">Todo not found</h2>
        <router-link to="/">
          <button class="button">Back to Todo List</button>
        </router-link>
      </div>
    </div>
    <div v-else class="container">
      <Navigation />
      <div class="todo-details">
        <h2 class="main-heading">Todo Details</h2>
        <div class="todo-card">
          <div class="todo-content">
            <h3 class="todo-title">{{ todo.title }}</h3>
            <div class="todo-meta">
              <p class="todo-id">ID: {{ todo.id }}</p>
              <span class="todo-status" :class="todo.completed ? 'completed' : 'pending'">
                {{ todo.completed ? 'Completed' : 'Pending' }}
              </span>
            </div>
          </div>
        </div>
        <router-link to="/">
          <button class="back-button">Back to HomePage</button>
        </router-link>
      </div>
      <BackToTop />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BackToTop from '../components/BackToTop.vue'
import Navigation from '../components/Navigation.vue'

export default {
  name: 'TodoDetails',
  components: {
    BackToTop,
    Navigation,
  },
  setup() {
    const route = useRoute()
    const todo = ref(null)
    const loading = ref(true)
    const toast = ref(null) // In a real app, you'd use a toast library

    const showToast = (title, description, status) => {
      console.log(`${status}: ${title} - ${description}`)
      // In a real app, you'd implement a toast notification
    }

    onMounted(async () => {
      try {
        const id = route.params.id
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || []
        const foundTodo = storedTodos.find((t) => t.id.toString() === id)

        if (foundTodo) {
          todo.value = foundTodo
        } else {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
          todo.value = response.data
        }
      } catch (error) {
        console.error('Error fetching todo details:', error)
        showToast(
          'Error fetching todo details',
          'There was an error loading the todo details. Please try again later.',
          'error',
        )
      } finally {
        loading.value = false
      }
    })

    return {
      todo,
      loading,
    }
  },
}
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #e2e8f0;
  border-top-color: #319795;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.container {
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.todo-not-found,
.todo-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.heading,
.main-heading {
  font-size: 1.875rem;
  font-weight: 700;
}

.main-heading {
  color: #319795;
  font-size: 2.25rem;
  text-align: center;
}

.todo-card {
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.todo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.todo-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #319795;
}

.todo-meta {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.todo-id {
  font-weight: 700;
}

.todo-status {
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.completed {
  background-color: #48bb78;
  color: white;
}

.pending {
  background-color: #f56565;
  color: white;
}

.button,
.back-button {
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.back-button {
  font-size: 1.125rem;
  align-self: center;
}

.button:hover,
.back-button:hover {
  background-color: #3182ce;
}
</style>
