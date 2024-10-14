<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>
<template>
  <footer class="py-3 footer" style="    background-color: white;">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between text-center">
        <div class="mb-12 col-lg-12 mb-lg-0">
          <div 
            class="text-sm  copyright text-muted"
            :class="store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            Copyright © 
            {{ new Date().getFullYear() }}
            <a
              href="https://www.creative-tim.com"
              class="font-weight-bold"
              target="_blank"
              ></a
            >
            
          </div>
        </div>
        
      </div>
    </div>
  </footer>
</template>
