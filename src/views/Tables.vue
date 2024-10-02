<script setup>
import AuthorsTable from "./components/AuthorsTable.vue";
import ProjectsTable from "./components/ProjectsTable.vue";

import { ref, watch } from 'vue';
import { useRoute } from "vue-router";

const route = useRoute();

const isChildRoute = ref(route.path !== '/tables');

watch(
  () => route.path,
  (newPath) => {
    isChildRoute.value = newPath !== '/tables';
  }
);
</script>

<template>
  <div>
    <div v-if="!isChildRoute">
      <div class="py-4 container-fluid">
        <div class="row">
          <div class="col-12">
            <authors-table />
          </div>
        </div>
        <div class="mt-4 row">
          <div class="col-12">
            <projects-table />
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
</style>
