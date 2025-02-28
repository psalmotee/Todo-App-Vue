<template>
  <div class="home-container">
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
    </div>
    <div v-else class="content-container">
      <Navigation />
      <div class="todo-list-container">
        <h2 class="main-heading">Todo List</h2>

        <div class="controls">
          <input class="search-input" placeholder="Search todos" v-model="search" />
          <select class="filter-select" v-model="filter">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button class="create-button" @click="openCreateModal">Create Todo</button>
        </div>

        <div v-if="filteredTodos.length === 0" class="no-todos-alert">
          <p>
            No todos found matching your criteria. Try a different search name or filter, or create
            a new todo.
          </p>
        </div>

        <div v-else class="todos-list">
          <div v-for="todo in paginatedTodos" :key="todo.id" class="todo-item">
            <router-link :to="`/todos/${todo.id}`" class="todo-link">
              <span class="todo-title" :class="{ 'completed-todo': todo.completed }">
                {{ todo.title }}
              </span>
            </router-link>
            <div class="todo-actions">
              <button class="edit-button" @click="openEditModal(todo)">Edit</button>
              <button class="delete-button" @click="handleDeleteTodo(todo.id)">Delete</button>
            </div>
          </div>
        </div>

        <div v-if="filteredTodos.length > 0" class="pagination">
          <button class="pagination-button" :disabled="currentPage === 1" @click="prevPage">
            Previous
          </button>
          <button class="pagination-button" :disabled="currentPage === pageCount" @click="nextPage">
            Next
          </button>
        </div>
      </div>

      <TodoModal
        :isOpen="isModalOpen"
        :onClose="closeModal"
        :onSubmit="editingTodo ? handleEditTodo : handleCreateTodo"
        :initialData="editingTodo"
      />

      <BackToTop />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import TodoModal from '../components/TodoModal.vue'
import BackToTop from '../components/BackToTop.vue'
import Navigation from '../components/Navigation.vue'

const ITEMS_PER_PAGE = 10

export default {
  name: 'HomePage',
  components: {
    TodoModal,
    BackToTop,
    Navigation,
  },
  setup() {
    const todos = ref([])
    const search = ref('')
    const filter = ref('all')
    const editingTodo = ref(null)
    const isLoading = ref(true)
    const currentPage = ref(1)
    const isModalOpen = ref(false)

    const showToast = (title, description, status) => {
      console.log(`${status}: ${title} - ${description}`)
      // In a real app, you'd implement a toast notification
    }

    const updateLocalStorage = (updatedTodos) => {
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }

    const fetchTodos = async () => {
      try {
        const storedTodos = JSON.parse(localStorage.getItem('todos'))
        if (storedTodos && storedTodos.length > 0) {
          todos.value = storedTodos
        } else {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
          const initialTodos = response.data.map((todo) => ({
            ...todo,
            title: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
          }))
          todos.value = initialTodos
          updateLocalStorage(initialTodos)
        }
      } catch (error) {
        console.error('Error fetching todos:', error)
        showToast(
          'Error fetching todos',
          'There was an error loading the todo list. Please try again later.',
          'error',
        )
      } finally {
        isLoading.value = false
      }
    }

    onMounted(fetchTodos)

    const filteredTodos = computed(() => {
      return todos.value.filter(
        (todo) =>
          todo.title.toLowerCase().includes(search.value.toLowerCase()) &&
          (filter.value === 'all' ||
            (filter.value === 'completed' ? todo.completed : !todo.completed)),
      )
    })

    const pageCount = computed(() => {
      return Math.ceil(filteredTodos.value.length / ITEMS_PER_PAGE)
    })

    const paginatedTodos = computed(() => {
      return filteredTodos.value.slice(
        (currentPage.value - 1) * ITEMS_PER_PAGE,
        currentPage.value * ITEMS_PER_PAGE,
      )
    })

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < pageCount.value) {
        currentPage.value++
      }
    }

    const openCreateModal = () => {
      editingTodo.value = null
      isModalOpen.value = true
    }

    const openEditModal = (todo) => {
      editingTodo.value = todo
      isModalOpen.value = true
    }

    const closeModal = () => {
      editingTodo.value = null
      isModalOpen.value = false
    }

    const handleCreateTodo = (newTodo) => {
      const createdTodo = { ...newTodo, id: Date.now() }
      const updatedTodos = [createdTodo, ...todos.value]
      todos.value = updatedTodos
      updateLocalStorage(updatedTodos)
      showToast('Todo created', 'Your new todo has been created successfully.', 'success')
    }

    const handleEditTodo = (editedTodo) => {
      const updatedTodos = todos.value.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo,
      )
      todos.value = updatedTodos
      updateLocalStorage(updatedTodos)
      showToast('Todo updated', 'Your todo has been updated successfully.', 'success')
    }

    const handleDeleteTodo = (id) => {
      const updatedTodos = todos.value.filter((todo) => todo.id !== id)
      todos.value = updatedTodos
      updateLocalStorage(updatedTodos)
      showToast('Todo deleted', 'Your todo has been deleted successfully.', 'info')
    }

    return {
      todos,
      search,
      filter,
      editingTodo,
      isLoading,
      currentPage,
      isModalOpen,
      filteredTodos,
      paginatedTodos,
      pageCount,
      prevPage,
      nextPage,
      openCreateModal,
      openEditModal,
      closeModal,
      handleCreateTodo,
      handleEditTodo,
      handleDeleteTodo,
    }
  },
}
</script>

<style scoped>
.home-container {
  max-width: 100%;
  overflow-x: hidden;
}

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

.content-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.todo-list-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.main-heading {
  font-size: 2.25rem;
  font-weight: 700;
  color: #319795;
  text-align: center;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  height: auto;
}

@media (min-width: 768px) {
  .controls {
    flex-direction: row;
    height: auto;
  }
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}

.filter-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}

@media (min-width: 768px) {
  .filter-select {
    width: 200px;
  }
}

.create-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #319795;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
}

@media (min-width: 768px) {
  .create-button {
    width: auto;
  }
}

.no-todos-alert {
  background-color: #bee3f8;
  color: #2b6cb0;
  padding: 1rem;
  border-radius: 0.25rem;
}

.todos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.todo-item {
  padding: 1rem;
  border: 2px solid #b2f5ea;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.2s;
}

.todo-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-color: #81e6d9;
}

@media (min-width: 640px) {
  .todo-item {
    flex-direction: row;
    align-items: center;
  }
}

.todo-link {
  text-decoration: none;
  color: inherit;
}

.todo-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #319795;
  margin-bottom: 0.5rem;
}

.todo-title:hover {
  color: #2c7a7b;
  text-decoration: underline;
}

.completed-todo {
  color: #718096;
  text-decoration: line-through;
}

@media (min-width: 640px) {
  .todo-title {
    margin-bottom: 0;
  }
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

@media (min-width: 640px) {
  .todo-actions {
    margin-top: 0;
  }
}

.edit-button,
.delete-button {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.edit-button {
  background-color: #4299e1;
  color: white;
}

.delete-button {
  background-color: #f56565;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 1rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #319795;
  border: 1px solid #319795;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .pagination-button {
    padding: 0.5rem 1.5rem;
  }
}
</style>
