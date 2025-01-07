<script setup xmlns:group-hover="http://www.w3.org/1999/xhtml">
import { getPage, getCover } from '@/api/video.js'

const page = ref()
const size = ref()

const total = ref()
const videos = ref()

const loading = ref(true)
const fetchData = async () => {
  loading.value = true
  const { msg, data, success } = await getPage({
    page: page.value,
    size: size.value
  })
  loading.value = false
  if (!success) {
    console.error(msg)
    return
  }
  total.value = data['total']
  videos.value = data['records']
}

const handleUpdatePage = () => {
  fetchData()
}

const handleUpdatePageSize = () => {
  fetchData()
}

onMounted(() => {
  page.value = 1
  size.value = 20
  fetchData()
})
</script>

<template>
  <div wh-full px-20 flex-col>
    <div flex items-center h-80 min-h-80 max-h-80></div>
    <n-scrollbar flex-1>
      <n-spin :show="loading">
        <div grid gap-20 style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))">
          <div flex-col flex-center v-for="v in videos">
            <div relative w-320 h-180 class="cover">
              <div class="mask">
                <div class="mask-bg"></div>
              </div>
              <img wh-full :src="getCover(v['id'])" :alt="v['id']" />
            </div>
            <div flex-center w-320 h-60>
              <n-ellipsis>{{ v['name'] }}</n-ellipsis>
            </div>
          </div>
        </div>
      </n-spin>
    </n-scrollbar>
    <div flex-center h-80 min-h-80 max-h-80 px-20>
      <n-pagination
        show-size-picker
        show-quick-jumper
        :item-count="total"
        :page-sizes="[20, 40, 60, 80, 100]"
        v-model:page="page"
        v-model:page-size="size"
        @update-page="handleUpdatePage"
        @update-page-size="handleUpdatePageSize"
      >
        <template #prev>上一页</template>
        <template #next>下一页</template>
      </n-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover {
  &:hover {
    .mask {
      display: flex;
    }
  }

  .mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;

    .mask-bg {
      display: flex;
      width: 320px;
      height: 180px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
