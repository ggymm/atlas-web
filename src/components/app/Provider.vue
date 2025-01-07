<template>
  <n-config-provider wh-full :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <slot />
  </n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
</script>
