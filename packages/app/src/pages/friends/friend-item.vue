<template>
  <uni-list-chat
    :avatar-circle="true"
    :border="false"
    clickable
    :key="props.userid"
    :title="userinfo.nickname"
    :avatar="avatar"
    @click="props.handleClick"
    note="你有一条新消息"
  ></uni-list-chat>
</template>
<script setup>
import { ref, computed } from "vue";
import { useUserInfo } from "@/hooks/userinfo.hook";
import Identicon from "identicon.js";
import MD5 from "md5.js";

const props = defineProps(["userid", "handleClick"]);

// 用户信息
const userinfo = useUserInfo(props.userid);

const avatar = computed(() => {
  return (
    userinfo.value.avatar ??
    "data:image/png;base64," +
      new Identicon(
        new MD5().update(props.userid).digest("hex"),
        420,
      ).toString()
  );
});
</script>

<style lang="scss" scoped>
.friend-apply-list-item {
  :deep(.uni-list-item__icon) {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
  }
}
</style>
