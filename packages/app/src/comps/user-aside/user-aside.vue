<template>
  <view class="user-aside">
    <view class="header flex flex-row items-center">
      <image
        class="avatar"
        mode="aspectFit"
        :src="'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'"
      />
      <view>
        <view class="font-bold text-xl text-ellipsis">{{
          userInfo.nickname
        }}</view>
      </view>
    </view>

    <uni-list :border="false">
      <uni-group
        class="user-aside-list-group bg-white"
        type="card"
        title="账号管理"
      >
        <uni-list-item showArrow :border="false" clickable title="个人信息" />
        <uni-list-item showArrow :border="false" clickable title="账号管理" />
        <uni-list-item showArrow :border="false" clickable title="通知" />
        <uni-list-item
          showArrow
          :border="false"
          clickable
          @tap="handleLogout"
          title="退出登录"
        />
      </uni-group>

      <uni-group
        class="user-aside-list-group bg-white"
        type="card"
        title="关于和帮助"
      >
        <uni-list-item
          :border="false"
          clickable
          title="版本信息"
          rightText="已是最新版本"
        />
        <uni-list-item showArrow :border="false" clickable title="官网" />
        <uni-list-item showArrow :border="false" clickable title="反馈" />
      </uni-group>
    </uni-list>
  </view>
</template>

<script setup>
import { rLogout } from "@/io/http/auth";
import { useAuthStore } from "@/store";
import { getSession, storage } from "@/utils/storage";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const userInfo = computed(() => {
  return {
    nickname: authStore.nickname,
  };
});

const sectionRef = ref();
const handleLogout = () => {
  sectionRef.value.open();
};

const handleLogoutConfirm = async () => {
  const session = getSession();
  storage.remove("session");
  sectionRef.value?.close();
  uni.showToast({
    icon: "success",
    title: "退出登录成功",
    duration: 1000,
  });
  setTimeout(() => {
    uni.reLaunch({
      url: "/pages/entry/entry",
    });
  }, 1000);
  if (!session) return;
  rLogout(session);
};
</script>

<style lang="scss" scoped>
.user-aside {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  .header {
    padding: 80upx 30upx;
    .avatar {
      height: 100upx;
      width: 100upx;
      border-radius: 50%;
      margin-right: 20upx;
    }
  }
}
</style>
@/io/http/auth @/store
