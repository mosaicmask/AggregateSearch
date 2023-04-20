<template>
  <div class="consumption-records">
    <ul>
      <template v-if="consumptionRecords.length">
        <template v-for="item in consumptionRecords" :key="item.time">
          <li class="records-item">
            <h5>{{ item.title }} - ¥{{ item.totalPrice }}</h5>
            <span>{{ item.time }}</span>
          </li>
        </template>
      </template>
      <template v-else>
        <li class="records-item center">
          <h5>暂无消费记录</h5>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
  interface ConsumptionRecords {
    title: string
    time: string
    totalPrice: string
  }
  const consumptionRecords = reactive<ConsumptionRecords[]>([])
</script>

<style lang="scss" scoped>
  .consumption-records {
    width: 100%;
    height: auto;
    background-color: #fff;
    box-shadow: 1px 5px 15px 1px #efefef;
    border-radius: 10px;
    padding: 0 20px;
    box-sizing: border-box;
    ul {
      margin: 0;
      padding: 0;
      li {
        width: 100%;
        height: 50px;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 14px;
          color: #9e9e9e;
        }
      }
      .center {
        justify-content: center;
      }
    }
  }
</style>
