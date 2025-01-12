<script setup>
import { getPage, getCover } from '@/api/video.js'

import SvgIcon from '@/components/icon/SvgIcon.vue'

const page = ref()
const size = ref()

const search = ref()

const total = ref()
const videos = ref()

const loading = ref(false)
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

const handleVideoPlay = (v) => {
  const base = 'C:/Users/19679/Videos/TG/'
  const path = `vlc://${base}${v['path']}`

  const body = document.querySelector('body')
  const click = document.createElement('a')
  click.href = path
  body.appendChild(click)
  click.click()
  body.removeChild(click)
}

onMounted(() => {
  page.value = 1
  size.value = 20
  fetchData()
})
</script>

<template>
  <div wh-full flex-col>
    <div flex flex-center gap-20 h-80 min-h-80 max-h-80>
      <div w-200></div>
      <div flex gap-20 flex-1>
        <n-input v-model:value="search" type="text" round />
        <n-button type="primary" round>
          <span>搜索影片</span>
        </n-button>
      </div>
      <div w-200></div>
    </div>
    <n-scrollbar flex-1 px-20>
      <n-spin :show="loading" min-h-200>
        <div grid gap-20 style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))">
          <div flex-col flex-center v-for="v in videos" :key="v['id']">
            <div relative w-320 h-180 class="cover">
              <div class="mask">
                <div class="mask-bg"></div>
                <div class="mask-play" @click="handleVideoPlay(v)">
                  <svg-icon icon="play" w-48 h-48 />
                </div>
              </div>
              <img wh-full :src="getCover(v['id'])" :alt="v['id']" loading="lazy" />
            </div>
            <div flex-center w-320 h-60 class="title">
              <n-ellipsis>
                {{ v['title'] }}
                <template #tooltip>
                  <div max-w-320>
                    {{ v['title'] }}
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

<style lang="scss">
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
      background-color: rgba(0, 0, 0, 0.5);
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
