<template>
  <nav class="navigation">
    <div class="nav-content">
      <h1 class="nav-title">Todo App</h1>

      <div class="nav-links-desktop">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/not-found" class="nav-link">Not Found</router-link>
        <router-link to="/error" class="nav-link">Error</router-link>
      </div>

      <button class="menu-button" @click="toggleDrawer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="drawer" :class="{ 'drawer-open': isDrawerOpen }">
      <div class="drawer-content">
        <button class="drawer-close" @click="toggleDrawer">&times;</button>
        <div class="drawer-links">
          <router-link to="/" class="drawer-link" @click="closeDrawer">Home</router-link>
          <router-link to="/not-found" class="drawer-link" @click="closeDrawer"
            >Not Found</router-link
          >
          <router-link to="/error" class="drawer-link" @click="closeDrawer">Error</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Navigation',
  setup() {
    const isDrawerOpen = ref(false)

    const toggleDrawer = () => {
      isDrawerOpen.value = !isDrawerOpen.value
    }

    const closeDrawer = () => {
      isDrawerOpen.value = false
    }

    return {
      isDrawerOpen,
      toggleDrawer,
      closeDrawer,
    }
  },
}
</script>

<style scoped>
.navigation {
  background-color: #319795;
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-content {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  font-size: 1.25rem;
  font-weight: 700;
}

@media (min-width: 768px) {
  .nav-title {
    font-size: 1.5rem;
  }
}

.nav-links-desktop {
  display: none;
}

@media (min-width: 768px) {
  .nav-links-desktop {
    display: flex;
    gap: 1rem;
  }
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.nav-link:hover {
  color: #2d3748;
  background-color: #e6fffa;
}

.menu-button {
  display: block;
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .menu-button {
    display: none;
  }
}

.drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background-color: white;
  transition: right 0.3s ease;
  z-index: 20;
}

@media (min-width: 768px) {
  .drawer {
    display: none;
  }
}

.drawer-open {
  right: 0;
}

.drawer-content {
  padding: 2rem 1rem;
  position: relative;
}

.drawer-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.drawer-link {
  color: #2d3748;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
}

.drawer-link:hover {
  background-color: #e6fffa;
  color: #319795;
}
</style>
