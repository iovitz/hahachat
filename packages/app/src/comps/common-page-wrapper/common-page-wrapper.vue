<template>
  <view class="common-page-wrapper">
    <uni-nav-bar
      dark
      class="text-white"
      left-icon="left"
      :title="props.title"
      :border="false"
      height="100upx"
      status-bar
      background-color="#575170"
      :fixed="true"
      @clickLeft="handleBackup"
    />

    <scroll-view
      :scroll-y="true"
      :style="`height: ${scrollViewHeight}px`"
      refresher-background="#eee"
      @scrolltolower="handleScrollToLower"
    >
      <!-- 页面内容 -->
      <slot name="default" />
    </scroll-view>

    <view class="bottom-btn" v-if="props.showButton">
      <button class="send-btn" type="primary" @tap="handleButtonClick">
        {{ props.buttonText }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(["title", "showButton", "buttonText", "buttonClick"]);

const emits = defineEmits(["buttonClick", "scrolltolower"]);

const scrollViewHeight = ref(0);
onMounted(() => {
  const sysInfo = uni.getSystemInfoSync();
  scrollViewHeight.value =
    sysInfo.screenHeight -
    uni.upx2px(100) -
    (props.showButton ? uni.upx2px(100) : 0);
});
const handleBackup = () => {
  uni.navigateBack();
};

const handleButtonClick = (e) => {
  emits("buttonClick", e);
};

const handleScrollToLower = (e) => {
  emits("scrolltolower", e);
};
</script>

<style lang="scss" scoped>
.common-page-wrapper {
  height: 100%;
  width: 100%;
  background-color: inherit;
  padding-bottom: 100upx;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}
.bottom-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px 30upx;
  background-color: #f5f5f5;
  .send-btn {
    line-height: 80upx;
    font-size: inherit;
  }
}
</style>
