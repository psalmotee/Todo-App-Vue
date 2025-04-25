<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">© 2024 PsalmoTee Tech - Todo App. All rights reserved.</p>
      <div class="social-links">
        <a href="https://github.com/psalmotee" target="_blank" rel="noopener" class="social-link">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a
          href="https://www.linkedin.com/in/samson-moradayo-211b26187/"
          target="_blank"
          rel="noopener"
          class="social-link"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
        <a
          href="https://instagram.com/Psalmo_Tee"
          target="_blank"
          rel="noopener"
          class="social-link"
        >
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGithub, faLinkedin, faInstagram);

export default {
  name: 'TodoFooter',
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.footer {
  background-color: #f7fafc;
  padding: 3.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #2d3748;
}

.footer-content {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.copyright {
  font-size: 0.875rem;
  color: #4a5568;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;
}

.social-link {
  font-size: 1.5rem;
  color: #4a5568;
  transition:
    transform 0.5s,
    color 0.3s;
}

.social-link:hover {
  color: #319795;
  transform: rotate(360deg);
}
</style>
