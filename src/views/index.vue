<template>
  <div class="search-box">
    <h1>在可视化图谱中开始 <em>多引擎</em> 探索</h1>
    <h4>要开始，请选择版本并在搜索框内输入内容</h4>
    <div class="label-box">
      <div class="label label-pick">无限制版</div>
      <div class="label">前端版</div>
    </div>
    <div class="input-box">
      <el-input v-model="input2" placeholder="Please input">
        <template #append>.com</template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const input2 = ref('')
</script>

<style lang="scss" scoped>
  .search-box {
    margin: 0 auto;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .label-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .label {
        width: 80px;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        background-color: rgb(216, 216, 216);
        color: rgb(59, 59, 59);
        font-size: 14px;
        font-weight: 500;
      }
      .label-pick {
        background-color: rgb(0, 0, 0);
        color: #fff;
      }
    }
    .input-box {
      width: 100%;
      margin: 20px;
    }
  }
</style>
