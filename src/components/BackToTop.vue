<template>
  <button class="back-to-top-button" @click="scrollToTop" aria-label="Back to top">
    <font-awesome-icon :icon="['fas', 'arrow-up']" />
  </button>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp)

export default {
  name: 'BackToTop',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    return {
      scrollToTop,
    }
  },
}
</script>

<style scoped>
.back-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #319795;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  transition: background-color 0.3s;
}

.back-to-top-button:hover {
  background-color: #2c7a7b;
}
</style>
