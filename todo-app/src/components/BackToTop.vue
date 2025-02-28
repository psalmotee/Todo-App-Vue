<template>
  <button class="back-to-top-button" @click="scrollToTop" aria-label="Back to top">
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BackToTop',
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
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.back-to-top-button:hover {
  background-color: #2c7a7b;
}
</style>
