<script setup>
import { cover, queryPage, queryStats } from '@/api/video.js'

import SvgIcon from '@/components/icon/SvgIcon.vue'

// ==================== 列表组件 ====================
const model = ref({
  page: 1,
  size: 20,
  search: null
})

const total = ref()
const videos = ref()

const loading = ref(false)
const fetchData = async () => {
  loading.value = true
  const { msg, data, success } = await queryPage({
    ...model.value
  })
  loading.value = false
  if (!success) {
    console.error(msg)
    return
  }
  total.value = data['total']
  videos.value = data['records']
}

const handleSearch = () => {
  fetchData()
}

const handleUpdatePage = () => {
  fetchData()
}

const handleUpdatePageSize = () => {
  fetchData()
}

const handleVideoPlay = (v) => {
  console.log(v)
}

// ==================== 设置组件 ====================
const drawer = ref(false)
const activeTab = ref('幸福')

const fetchStats = async () => {
  const { msg, data, success } = await queryStats()
  if (!success) {
    console.error(msg)
    return
  }
  console.log(data)
}

const handleConfig = () => {
  drawer.value = true
}

const handleTabChange = (tab) => {
  console.log(tab)
  activeTab.value = tab
}

onMounted(() => {
  model.value = {
    page: 1,
    size: 60
  }
  fetchData()
  fetchStats()
})
</script>

<template>
  <div wh-full flex-col>
    <div flex flex-center gap-20 h-80 min-h-80 max-h-80>
      <div w-200></div>
      <div flex gap-20 flex-1>
        <n-input v-model:value="model.search" type="text" round />
        <n-button type="primary" round @click="handleSearch">
          <span>搜索影片</span>
        </n-button>
        <n-button type="primary" round @click="handleConfig">
          <span>应用设置</span>
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
              <img wh-full :src="cover(v['id'])" :alt="v['id']" loading="lazy" />
            </div>
            <div flex-center w-320 h-60 class="title">
              <n-ellipsis>
                <span font-size-13>{{ v['title'] }}</span>
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
        v-model:page="model.page"
        v-model:page-size="model.size"
        @update-page="handleUpdatePage"
        @update-page-size="handleUpdatePageSize"
      >
        <template #prev>上一页</template>
        <template #next>下一页</template>
      </n-pagination>
    </div>
    <n-drawer v-model:show="drawer" width="60%">
      <n-drawer-content>
        <template #header>应用设置</template>
        <template #footer>
          <n-button type="primary" @click="">确认</n-button>
        </template>
        <div flex-col wh-full>
          <div>
            <n-tabs type="bar" @update-value="handleTabChange">
              <n-tab name="标签数据">标签数据</n-tab>
              <n-tab name="统计数据">统计数据</n-tab>
              <n-tab name="后台任务">计划任务</n-tab>
            </n-tabs>
          </div>
          <n-scrollbar flex-1>
            <div v-show="activeTab === '标签数据'"></div>
            <div v-show="activeTab === '统计数据'"></div>
            <div v-show="activeTab === '后台任务'"></div>
          </n-scrollbar>
        </div>
      </n-drawer-content>
    </n-drawer>
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
