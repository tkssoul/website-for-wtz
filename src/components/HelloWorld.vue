<script setup lang="ts">
import { ref } from 'vue'
const receiveButtonSize = ref(64)
const refuseButtonSize = ref(64)

const refuseMsg = ref([
  '你可以做我一辈子的恋人吗？',
  '你可以喜欢我一辈子吗？',
  '你可以完全相信我吗？',
  '你可以永远陪在我身边吗？',
  '无论如何，让我一直在你身边，直到月相不轰鸣',
])
const receiveMsg = ref([
  '我可以抽一辈子烟吗？',
  '你可以宠我一辈子吗？',
  '我可以就这样被你宠坏吗？',
  '你可以把我变成更好的人吗？',
  '我想一直在你身边，直到月相不轰鸣',
])
const refuseCount = ref(0)
const receiveCount = ref(0)

const refuseMax = ref(false)

// 改变“可以”按钮大小
const changeReveiveButtonSize = () => {
  const newSize = 64 - receiveCount.value * 16
  receiveButtonSize.value = Math.max(newSize, 0)
}
// 改变“不行”按钮大小
const changeRefuseButtonSize = () => {
  const newSize = 64 - refuseCount.value * 16
  refuseButtonSize.value = Math.max(newSize, 0)
}

// 点击按钮
const clickButton = (type: string) => {
  if (type === 'receive') {
    receiveCount.value++
    changeReveiveButtonSize()
    msgType.value = 'receive'
  } else {
    refuseCount.value++
    changeRefuseButtonSize()
    msgType.value = 'refuse'
  }
}

const msgType = ref('refuse')
</script>

<template>
  <div class="greetings">
    <img v-if="refuseCount<4" alt="Hello Kitty" class="logo" src="/images/开心.png" width="125" height="125" />
    <img v-if="refuseCount>=4" alt="Hello Kitty" class="logo" src="/images/不开心歪头.png" width="125" height="125" />
    <!-- <img v-if="receiveCount>=4" alt="Hello Kitty" class="logo" src="/public/开心歪头.jpeg" width="125" height="125" /> -->

    <h1 v-if="msgType === 'refuse' && refuseCount < 4">{{ refuseMsg[refuseCount] }}</h1>
    <h1 v-if="msgType === 'receive' && refuseCount < 4">{{ receiveMsg[receiveCount] }}</h1>
    <h1 v-if="refuseCount >= 4">臭男人，我再也不想理你了</h1>

    <a-space>
      <a-button
        v-if="receiveButtonSize > 0 && refuseButtonSize > 0"
        @click="clickButton('receive')"
        class="click-button"
        :style="{
          fontSize: receiveButtonSize + 'px',
          padding: receiveButtonSize / 4 + 'px',
          height: 'auto',
          width: 'auto',
        }"
        long
      >
        可以
      </a-button>
      <a-button
        v-if="refuseButtonSize > 0 && receiveButtonSize > 0"
        @click="clickButton('refuse')"
        class="click-button"
        :style="{
          fontSize: refuseButtonSize + 'px',
          padding: refuseButtonSize / 4 + 'px',
          height: 'auto',
          width: 'auto',
        }"
        long
      >
        不行
      </a-button>
    </a-space>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: max-content;
}

.greetings h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}

.click-button {
  background-color: #ff69b4;
  border-radius: 8px;
}
</style>
