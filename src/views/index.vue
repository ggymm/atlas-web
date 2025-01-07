<script setup>
import { getPage } from '@/api/video.js'

const total = ref()
const videos = ref()

const fetchData = async () => {
  const { msg, data, success } = await getPage({
    page: 1,
    size: 10
  })
  if (!success) {
    console.error(msg)
    return
  }
  total.value = data['total']
  videos.value = data['records']
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div wh-full p-20 flex-col>
    <div h-80 min-h-80 max-h-80></div>
    <div flex-1>
      <n-grid :x-gap="20" :y-gap="20" cols="2 400:4 600:6">
        <n-grid-item v-for="v in videos">
          <div>{{ v['name'] }}</div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<style scoped></style>
