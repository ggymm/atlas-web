<template>
  <provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </provider>
</template>

<script setup>
import Provider from '@/components/app/Provider.vue'
</script>
