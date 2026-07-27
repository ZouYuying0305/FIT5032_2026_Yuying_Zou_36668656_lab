<script setup>
import { reactive, ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Firebase/init'
import BookList from '../components/BookList.vue'

const form = reactive({
  name: '',
  isbn: '',
})

const errors = reactive({
  name: '',
  isbn: '',
  firebase: '',
})

const successMessage = ref('')
const refreshKey = ref(0)

const clearErrors = () => {
  errors.name = ''
  errors.isbn = ''
  errors.firebase = ''
  successMessage.value = ''
}

const validateForm = () => {
  clearErrors()

  if (!form.name.trim()) {
    errors.name = 'Book name is required.'
  }

  if (!form.isbn) {
    errors.isbn = 'ISBN is required.'
  } else if (Number(form.isbn) <= 0) {
    errors.isbn = 'ISBN must be saved as a positive number.'
  }

  return !errors.name && !errors.isbn
}

const addBook = async () => {
  if (!validateForm()) return

  try {
    const bookData = {
      name: form.name.trim(),
      isbn: Number(form.isbn),
      createdAt: new Date(),
    }

    const docRef = await addDoc(collection(db, 'books'), bookData)
    console.log('Added book to Firestore:', {
      id: docRef.id,
      ...bookData,
    })

    successMessage.value = `Book added successfully. Document ID: ${docRef.id}`
    form.name = ''
    form.isbn = ''
    refreshKey.value += 1
  } catch (error) {
    errors.firebase = error.message
    console.error('Firestore add book error:', error)
  }
}
</script>

<template>
  <section class="container py-5">
    <div class="page-card">
      <p class="text-uppercase text-primary fw-semibold mb-2">FIT5032 Lab 8</p>
      <h1 class="h2">Add Book to Firestore</h1>
      <p class="text-secondary">
        This page demonstrates how to add, retrieve, update, delete, and query book data using Cloud
        Firestore.
      </p>

      <form class="row g-3 mt-3" @submit.prevent="addBook">
        <div class="col-12 col-md-6">
          <label for="book-name" class="form-label">Book Name</label>
          <input
            id="book-name"
            v-model.trim="form.name"
            class="form-control"
            type="text"
            placeholder="Example: 1984"
          />
          <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
        </div>

        <div class="col-12 col-md-6">
          <label for="book-isbn" class="form-label">ISBN</label>
          <input
            id="book-isbn"
            v-model.number="form.isbn"
            class="form-control"
            type="number"
            placeholder="Example: 1949"
          />
          <small v-if="errors.isbn" class="text-danger">{{ errors.isbn }}</small>
        </div>

        <div class="col-12">
          <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
          <div v-if="errors.firebase" class="alert alert-danger">{{ errors.firebase }}</div>
        </div>

        <div class="col-12">
          <button class="btn btn-primary" type="submit">Add Book</button>
        </div>
      </form>
    </div>

    <BookList :refresh-key="refreshKey" />
  </section>
</template>

<style scoped>
.page-card {
  background-color: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(31, 77, 120, 0.08);
  padding: 28px;
}
</style>
