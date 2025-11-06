<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { formatDate } from '@/utils/date.js'

const desc = ref(null)
const response = ref(null)
const error = ref(null)
const loading = ref(false)

const getAllTodos = async () => {
  response.value = null
  error.value = null
  loading.value = true

  try {
    const { data } = await axios.get('http://localhost:8080/all')
    response.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const createTodo = async () => {
  error.value = null
  loading.value = true

  try {
    await axios.post('http://localhost:8080/todo', { desc: desc.value })
    desc.value = '' // clear input
    await getAllTodos() // refresh list after creation
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const deleteTodo = async (id) => {
  loading.value = true
  error.value = null
  try {
    await axios.delete(`http://localhost:8080/todo/${id}`)
    await getAllTodos() // refresh the table after deletion
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const updateTodo = async (row) => {
  loading.value = true
  error.value = null
  try {
    await axios.put(`http://localhost:8080/todo/${row.id}`, {
      desc: row.desc,
    })
    await getAllTodos() // refresh table after update if you want
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAllTodos()
})
</script>

<template>
  <div v-loading="loading">
    <el-input v-model="desc" placeholder="Enter TODO" />
    <el-button type="primary" @click="createTodo">Create</el-button>

    <el-alert v-if="error" :title="error" type="error" show-icon />

    <el-table v-if="response" :data="response" style="width: 100%; margin-top: 20px">
      <el-table-column label="Description">
        <template #default="{ row }">
          <el-input v-model="row.desc" size="small" @blur="updateTodo(row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="Created At"
        :formatter="(row, col, value) => formatDate(value)"
      />
      <el-table-column
        prop="updateAt"
        label="Updated At"
        :formatter="(row, col, value) => formatDate(value)"
      />
      <el-table-column label="Actions">
        <template #default="{ row }">
          <el-button type="danger" size="small" @click="deleteTodo(row.id)"> Delete </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
