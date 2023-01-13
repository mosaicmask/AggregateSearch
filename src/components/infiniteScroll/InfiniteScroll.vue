<template>
  <!-- 无限滚动组件 -->
  <div class="scroll-body">
    <div class="tag-list">
      <div
        class="loop-slider"
        v-for="(_, i) in loopArray"
        :key="i"
        :style="[
          `--duration: ${random(DURATION - 5000, DURATION + 5000)}ms`,
          `--direction: ${i % 2 ? 'reverse' : 'normal'} `
        ]"
      >
        >
        <div class="inner">
          <template v-for="tag in shuffle(TAGS).slice(0, TAGS_PER_ROW)" :key="tag">
            <div class="tag"><span>#</span> {{ tag }}</div>
          </template>
          <template v-for="tag in shuffle(TAGS).slice(0, TAGS_PER_ROW)" :key="tag">
            <div class="tag"><span>#</span> {{ tag }}</div>
          </template>
        </div>
      </div>
      <div class="fade"></div>
    </div>
  </div>
</template>

<script setup>
  // const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2']
  const TAGS = [
    'HTML',
    'CSS',
    'JavaScript',
    'Typescript',
    'Tailwind',
    'React',
    'Next.js',
    'Gatsby',
    'UI/UX',
    'SVG',
    'animation',
    'webDev'
  ]
  const DURATION = 15000
  const ROWS = 5
  const TAGS_PER_ROW = 5
  const loopArray = [...new Array(ROWS)]

  // 随机生成持续时间
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
  // 原地算法对数组的元素进行排序，并返回数组
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random())
</script>

<style lang="scss" scoped>
  .scroll-body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .tag-list {
    width: 30rem;
    max-width: 90vw;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 1rem 0;
    position: relative;
    padding: 1.5rem 0;
    overflow: hidden;
  }

  .loop-slider {
    .inner {
      display: flex;
      width: fit-content;
      animation-name: loop;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-direction: var(--direction);
      animation-duration: var(--duration);
    }
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0 0.2rem;
    color: #e2e8f0;
    font-size: 0.9rem;
    background-color: #334155;
    border-radius: 0.4rem;
    padding: 0.7rem 1rem;
    margin-right: 1rem; // Must used margin-right instead of gap for the loop to be smooth
    box-shadow: 0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%),
      0 0.2rem 1.5rem rgb(0 0 0 / 40%);

    span {
      font-size: 1.2rem;
      color: #64748b;
    }
  }

  .fade {
    pointer-events: none;
    background: linear-gradient(90deg, #1e293b, transparent 30%, transparent 70%, #1e293b);
    position: absolute;
    inset: 0;
  }

  @keyframes loop {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
