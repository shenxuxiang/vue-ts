<script setup lang="ts">
import { Popover, Layout, Avatar, Menu, Button, Space } from "ant-design-vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import avatarUrl from "@/assets/avatar.png";
import { logout } from "@/services/login";
import useMainStore from "@/store/main";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const { Content, Sider, Header, Footer } = Layout;
const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
const { menuItems, userInfo } = storeToRefs(mainStore);
const menuCollapse = ref(false);
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

// 监听路由变化
watch(
  () => route.fullPath,
  (fullPath: string) => {
    selectedKeys.value = [fullPath];

    const reg = /(\/[^\/]+)/g;
    const keys: string[] = [];
    while (reg.exec(fullPath)) {
      keys.push(RegExp.$1);
    }

    openKeys.value = keys.reduce((memo, key) => {
      const prev = memo[memo.length - 1] || "";
      memo.push(prev + key);
      return memo;
    }, [] as string[]);
  },
  { immediate: true },
);

function handleTriggerMenuCollapse() {
  menuCollapse.value = !menuCollapse.value;
}

function handleChangeSelectedKeys(values: any) {
  selectedKeys.value = values.selectedKeys;
  router.push(values.selectedKeys[0]);
}

function handleLogout() {
  logout().then((res: any) => {
    if (res.code === 0) router.push("/login");
  });
}

function handleUpdatePasswd() {
  router.push("/update-password");
}

watch(openKeys, () => console.log(openKeys.value, 11111))
</script>

<template>
  <Layout style="min-height: 100vh" theme="light">
    <Sider theme="light" :width="240" :collapsed="menuCollapse">
      <section class="qm-logo">
        <div class="qm-log-bg" />
        <h1 :class="['qm-log-title', { hide: menuCollapse }]">
          界首市农机作业平台
        </h1>
      </section>
      <Menu
        mode="inline"
        :items="menuItems as any"
        :inlineCollapsed="menuCollapse"
        :selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        @select="handleChangeSelectedKeys"
      />
    </Sider>
    <Layout>
      <Header class="qm-header">
        <div
          class="control-menu-collapse-icon"
          @click="handleTriggerMenuCollapse"
        >
          <MenuFoldOutlined v-if="menuCollapse" />
          <MenuUnfoldOutlined v-else />
        </div>
        <Popover>
          <template #content>
            <Space direction="vertical" size="small">
              <Button type="text" @click="handleLogout">退出登录</Button>
              <Button type="text" @click="handleUpdatePasswd">修改密码</Button>
            </Space>
          </template>
          <div class="qm-avatar">
            <Avatar :size="48" :src="avatarUrl" />
            {{ userInfo.username }}
          </div>
        </Popover>
      </Header>
      <Content class="qm-container">
        <div class="qm-page-content">
          <RouterView v-slot:default="{ Component }">
            <Transition mode="out-in" name="router-fade">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </div>
        <Footer class="qm-footer"
          >安徽阡陌网络科技有限公司 ©2022 Created by Qianmo</Footer
        >
      </Content>
    </Layout>
  </Layout>
</template>

<style lang="less">
.qm-logo {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 64px;
  &::after {
    position: absolute;
    bottom: 0;
    content: "";
    height: 0.5px;
    width: 100%;
    background: rgba(1, 1, 1, 0.03);
  }
}
.qm-log-bg {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  margin-left: 15px;
  background: url(@/assets/logo.png) no-repeat left top / contain;
}
.qm-log-title {
  flex: 1 0 0;
  line-height: 1;
  font-size: 18px;
  font-weight: bold;
  color: #6c69ff;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.3s ease;
  &.hide {
    flex: 0;
    opacity: 0;
    visibility: hidden;
  }
}
.qm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0 !important;
  background: #fff !important;
}
.control-menu-collapse-icon {
  padding: 0 20px 0;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #1677ff;
  }
}
.qm-avatar {
  font-size: 16px;
  color: #333;
}
.qm-container {
  height: calc(100vh - 64px);
  overflow: auto;
}
.qm-page-content {
  display: inline-block;
  width: 100%;
  min-height: calc(100vh - 126px);
}
.qm-footer {
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  line-height: 1;
}

.router-fade-enter-active {
  animation: fade_in 0.2s linear;
}
.router-fade-leave-active {
  animation: fade_out 0.2s ease;
}

@keyframes fade_in {
  0% {
    transform: translate(200px);
    opacity: 0;
  }
  100% {
    transform: translate(0px);
    opacity: 1;
  }
}
@keyframes fade_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
