<template>
  <nav class="navigation">
    <div class="nav-content">
      <div class="nav-links-desktop">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/not-found" class="nav-link">Not Found</router-link>
        <router-link to="/ErrorBoundary" class="nav-link" @click="closeDrawer">Error</router-link>
      </div>

      <button class="menu-button" @click="toggleDrawer">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </div>

    <div class="drawer" :class="{ 'drawer-open': isDrawerOpen }">
      <div class="drawer-content">
        <button class="drawer-close" @click="toggleDrawer">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <div class="drawer-links">
          <router-link to="/" class="drawer-link" @click="closeDrawer">Home</router-link>
          <router-link to="/not-found" class="drawer-link" @click="closeDrawer"
            >Not Found</router-link
          >
          <router-link to="/ErrorBoundary" class="drawer-link" @click="closeDrawer">Error</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faTimes)

export default {
  name: 'NavigationBar',
  components: {
    FontAwesomeIcon,
  },
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
.nav-content {
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

.nav-links-desktop {
  display: none;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0.4rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #2d3748;
  background-color: #e6fffa;
}

.menu-button {
  display: block;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-button:hover {
  color: #2d3748;
  background-color: #e6fffa;
}

.drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  transition: right 0.3s ease;
  z-index: 20;
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
  transition: all 0.3s ease;
}

.drawer-link:hover {
  background-color: #e6fffa;
  color: #319795;
}

@media (min-width: 768px) {
  .nav-title {
    font-size: 1.5rem;
  }

  .nav-links-desktop {
    display: flex;
    gap: 1rem;
  }

  .menu-button {
    display: none;
  }

  .drawer {
    display: none;
  }
}
</style>
