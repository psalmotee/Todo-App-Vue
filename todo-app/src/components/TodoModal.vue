<template>
  <div>
    <div v-if="isOpen" class="modal-overlay" @click="onClose"></div>
    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ initialData ? 'Edit Todo' : 'Create Todo' }}</h2>
          <button class="close-button" @click="onClose">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-control">
            <label class="form-label">Title</label>
            <input v-model="title" class="form-input" placeholder="Enter todo title" />
          </div>
          <div class="form-control mt-4">
            <label class="checkbox">
              <input type="checkbox" v-model="completed" />
              <span class="ml-2">Completed</span>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="button primary-button mr-3" @click="handleSubmit">
            {{ initialData ? 'Save' : 'Create' }}
          </button>
          <button class="button" @click="onClose">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'TodoModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    initialData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const title = ref('')
    const completed = ref(false)

    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal && props.initialData) {
          title.value = props.initialData.title
          completed.value = props.initialData.completed
        } else if (newVal) {
          title.value = ''
          completed.value = false
        }
      },
      { immediate: true },
    )

    watch(
      () => props.initialData,
      (newVal) => {
        if (newVal) {
          title.value = newVal.title
          completed.value = newVal.completed
        }
      },
    )

    const handleSubmit = () => {
      if (title.value.trim()) {
        props.onSubmit({
          id: props.initialData ? props.initialData.id : undefined,
          title: title.value.trim(),
          completed: completed.value,
        })
        props.onClose()
      }
    }

    return {
      title,
      completed,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.modal-content {
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;
}

.modal-body {
  padding: 1rem 0;
}

.form-control {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.mt-4 {
  margin-top: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  background-color: white;
}

.primary-button {
  background-color: #4299e1;
  color: white;
  border-color: #4299e1;
}

.mr-3 {
  margin-right: 0.75rem;
}
</style>
