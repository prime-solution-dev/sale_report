<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>
<template>
  <footer class="py-3 footer mt-5" style="    background-color: white;">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between text-center">
        <div class="mb-12 col-lg-12 mb-lg-0">
          <div 
            class="text-sm  copyright text-muted"
            :class="store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            Copyright © 
            {{ new Date().getFullYear() }}
        
            
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
