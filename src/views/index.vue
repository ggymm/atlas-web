<script setup>
import { taskExec, taskClean, taskEvents } from '@/api/task.js'
import { videoCover, videoInfo, videoPage, videoPaths } from '@/api/video.js'

import { useWindowResize } from '@/hooks/index.js'
import { $ } from '@/utils/index.js'

import SvgIcon from '@/components/icon/SvgIcon.vue'

const syntaxes = [
  'A OR B',
  'A AND B',
  'A AND (B OR C)',
  'A AND (B OR C) AND D',
  'A AND (B OR C) AND (D OR E)',
  'A AND ((B AND C) OR (D AND E))',
  'A AND (B OR C) AND (D OR E) AND F'
]

// ==================== 列表组件 ====================
const query = ref({
  page: 1,
  size: 60,
  path: null,
  search: null
})

const total = ref()
const paths = ref()
const videos = ref()

const loading = ref(false)
const fetchPage = async () => {
  loading.value = true
  const { msg, data, success } = await videoPage({
    ...query.value
  })
  loading.value = false
  if (!success) {
    console.error(msg)
    return
  }
  total.value = data['total']
  videos.value = data['records']
}

const fetchPaths = async () => {
  const { msg, data, success } = await videoPaths()
  if (!success) {
    console.error(msg)
    return
  }
  const options = []
  data.forEach((item) => {
    options.push({
      label: item,
      value: item
    })
  })
  paths.value = options
}

const handleSearch = () => {
  fetchPage()
}

const handleConfig = () => {
  fetchInfo()
  fetchEvents()
  drawer.value = true
  active.value = '计划任务'

  // 重置表格高度
  nextTick(() => {
    resetTableHeight()
  })
}

const handlePlayVideo = (v) => {
  if (window['playVideo']) {
    window['playVideo'](v['path'])
  }
}

const handleLikeVideo = (v) => {
  console.log(v)
}

const handleUpdatePage = () => {
  fetchPage()
}

const handleUpdatePageSize = () => {
  fetchPage()
}

// ==================== 设置组件 ====================
const drawer = ref(false)
const active = ref('计划任务')

const infoData = ref({
  root: 0,
  total: 0,
  totalSize: 0,
  totalDuration: 0
})
const infoLabel = ref([
  {
    key: 'root',
    label: '根目录'
  },
  {
    key: 'total',
    label: '总数'
  },
  {
    key: 'totalSize',
    label: '总大小'
  },
  {
    key: 'totalDuration',
    label: '总时长'
  }
])

const eventsData = ref()
const eventsColumns = ref([
  {
    title: '事件',
    key: 'content'
  },
  {
    title: '时间',
    key: 'createAt'
  }
])
const eventsLoading = ref(false)

const fetchInfo = async () => {
  const { msg, data, success } = await videoInfo()
  if (!success) {
    console.error(msg)
    return
  }
  infoData.value = data
}

const fetchEvents = async () => {
  eventsLoading.value = true
  const { msg, data, success } = await taskEvents()
  eventsLoading.value = false
  if (!success) {
    console.error(msg)
    return
  }
  eventsData.value = data
}

const handleTaskExec = async () => {
  const { msg, success } = await taskExec()
  if (!success) {
    console.error(msg)
  }
  await fetchEvents()
  window['$message'].success('开始扫描文件夹')
}

const handleTaskClean = async () => {
  const { msg, success } = await taskClean()
  if (!success) {
    console.error(msg)
  }
  await fetchEvents()
  window['$message'].success('开始清空数据库')
}

const handleTabChange = (tab) => {
  active.value = tab
}

const height = ref(200)
const resetTableHeight = () => {
  const container = $('.n-drawer .n-scrollbar')
  const tableContainer = $('.n-drawer .table-container')
  if (!container || !tableContainer) {
    return
  }
  // 100 = 20 + 20 + 40 + 20
  height.value = container.clientHeight - 100
}
useWindowResize(resetTableHeight, 0)

onMounted(() => {
  // 获取视频列表
  fetchPage()
  // 获取视频路径列表
  fetchPaths()

  // 获取视频信息
  fetchInfo()
  // 获取事件列表
  fetchEvents()
})
</script>

<template>
  <div wh-full flex-col>
    <div flex flex-center gap-20 h-80 min-h-80 max-h-80>
      <div w-200></div>
      <div flex gap-20 flex-1>
        <div w-200>
          <n-select v-model:value="query.path" :options="paths" placeholder="选择筛选目录" />
        </div>
        <div flex-1>
          <n-input v-model:value="query.search" type="text" placeholder="请输入关键词或表达式" round>
            <template #suffix>
              <n-popover trigger="hover">
                <template #trigger>
                  <svg-icon icon="info" w-20 h-20 cursor-pointer />
                </template>
                <div flex-col class="syntax-help">
                  <div v-for="(item, index) in syntaxes" :key="index" class="syntax-item">
                    {{ item }}
                  </div>
                </div>
              </n-popover>
            </template>
          </n-input>
        </div>
        <div flex-row gap-20>
          <n-button type="primary" round @click="handleSearch">
            <span>搜索影片</span>
          </n-button>
          <n-button type="primary" round @click="handleConfig">
            <span>应用设置</span>
          </n-button>
        </div>
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
                <div class="mask-play" @click="handlePlayVideo(v)">
                  <svg-icon icon="play" w-48 h-48 />
                </div>
                <div class="mask-like" @click="handleLikeVideo(v)">
                  <svg-icon icon="like" w-48 h-48 />
                </div>
              </div>
              <img wh-full :src="videoCover(v['id'])" :alt="v['id']" loading="lazy" />
            </div>
            <div flex-center w-320 h-60 class="title">
              <n-ellipsis>
                <span font-size-13>{{ v['title'] }}</span>
                <template #tooltip>
                  <div max-w-320 line-height-normal>
                    {{ v['title'] }}
                  </div>
                </template>
              </n-ellipsis>
            </div>
          </div>
        </div>
      </n-spin>
      <n-back-top :right="20" :bottom="20" />
    </n-scrollbar>
    <div flex-center h-80 min-h-80 max-h-80 px-20>
      <n-pagination
        show-size-picker
        show-quick-jumper
        :item-count="total"
        :page-sizes="[20, 40, 60, 80, 100]"
        v-model:page="query.page"
        v-model:page-size="query.size"
        @update-page="handleUpdatePage"
        @update-page-size="handleUpdatePageSize"
      >
        <template #prev>上一页</template>
        <template #next>下一页</template>
      </n-pagination>
    </div>
    <n-drawer v-model:show="drawer" width="80%">
      <n-drawer-content>
        <template #header>应用设置</template>
        <template #footer>
          <n-button type="primary" @click="">确认</n-button>
        </template>
        <div flex-col wh-full>
          <div>
            <n-tabs type="bar" :default-value="active" @update-value="handleTabChange">
              <n-tab name="计划任务">计划任务</n-tab>
              <n-tab name="统计信息">统计信息</n-tab>
            </n-tabs>
          </div>
          <n-scrollbar flex-1 ref="container">
            <div v-show="active === '计划任务'">
              <div flex-col gap-20 py-20>
                <div flex-row items-center justify-between h-40>
                  <div>
                    <n-button type="success" @click="fetchEvents()">刷新数据</n-button>
                  </div>
                  <div flex-row gap-20>
                    <n-button type="primary" @click="handleTaskExec()">扫描文件夹</n-button>
                    <n-button type="success" @click="handleTaskClean()">清空数据库</n-button>
                  </div>
                </div>
                <div flex-1 class="table-container">
                  <n-data-table
                    flex-height
                    :data="eventsData"
                    :style="{ width: '100%', height: `${height}px` }"
                    :loading="eventsLoading"
                    :columns="eventsColumns"
                  />
                </div>
              </div>
            </div>
            <div v-show="active === '统计信息'">
              <div flex-col py-20>
                <div flex-row items-center justify-items-center h-40 v-for="item in infoLabel">
                  <div w-120>
                    {{ item['label'] }}
                  </div>
                  <div>{{ infoData[item['key']] }}</div>
                </div>
              </div>
            </div>
          </n-scrollbar>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style lang="scss">
.syntax-help {
  min-width: 360px;
  font-size: 13px;

  .syntax-item {
    color: #16b777;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;

    &:hover {
      background: #59595e;
    }
  }
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
      background-color: rgba(0, 0, 0, 0.5);
    }

    .mask-play {
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 25%;
      transform: translate(-50%, -50%);
      transition: all 0.3s;

      &:hover {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }

    .mask-like {
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: 75%;
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
