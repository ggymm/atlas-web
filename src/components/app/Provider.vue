<template>
  <n-config-provider wh-full :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme" :theme-overrides="customTheme" inline-theme-disabled>
    <n-modal-provider>
      <slot />
    </n-modal-provider>
  </n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'

import { customTheme } from '@/theme/index.js'
</script>
