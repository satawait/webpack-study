<template>
  <div>Vue</div>
  <ul>
    <li>
      <router-link to="/home">Home</router-link>
    </li>
    <li>
      <router-link to="/about">About</router-link>
    </li>
  </ul>
  <router-view />
</template>

<script setup lang="ts"></script>

<style scoped></style>
