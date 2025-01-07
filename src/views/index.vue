<script setup>
import { getPage, getCover } from '@/api/video.js'

import SvgIcon from '@/components/icon/SvgIcon.vue'

const page = ref()
const size = ref()

const search = ref()

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
  <div wh-full px-20 flex-col class="app">
    <div flex items-center h-80 min-h-80 max-h-80>
      <n-input v-model:value="search" type="text" />
      <n-button>搜索</n-button>
    </div>
    <n-scrollbar flex-1>
      <n-spin :show="loading">
        <div grid gap-20 style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))">
          <div flex-col flex-center v-for="v in videos">
            <div relative w-320 h-180 class="cover">
              <div class="mask">
                <div class="mask-bg"></div>
                <div class="mask-play">
                  <svg-icon icon="image-play" w-48 h-48 />
                </div>
                <div class="mask-handle">
                  <n-button text circle>
                    <svg-icon icon="icon-check" w-24 h-24 />
                  </n-button>
                  <n-button text circle>
                    <svg-icon icon="icon-love" w-24 h-24 />
                  </n-button>
                  <n-button text circle>
                    <svg-icon icon="icon-dots" w-24 h-24 />
                  </n-button>
                </div>
              </div>
              <img wh-full :src="getCover(v['id'])" :alt="v['id']" />
            </div>
            <div flex-center w-320 h-60 class="title">
              <n-ellipsis>
                {{ v['name'] }}
                <template #tooltip>
                  <div max-w-320>
                    {{ v['name'] }}
                  </div>
                </template>
              </n-ellipsis>
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
.app {
  background: #101014;
}

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

    .mask-play {
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s;

      &:hover {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }

    .mask-handle {
      position: absolute;
      left: 50%;
      bottom: 20px;
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      transform: translate(-50%, 0);
    }
  }
}

.title {
  color: rgba(255, 255, 255, 0.8);
}
</style>
