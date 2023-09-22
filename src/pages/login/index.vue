<script setup lang="ts">
import { shallowRef, ref, shallowReactive, onMounted, onUnmounted } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { getCookie, setCookie, encrypto, setToken } from "@/utils";
import { Checkbox, Button, message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import Input from "@/components/Input.vue";
import { login } from "@/services/login";
import useMainStore from "@/store/main";

const { queryUserInfo } = useMainStore();
const router = useRouter();
const route = useRoute();
const rules = shallowReactive({
  userName: [{ message: "用户名不能为空", pattern: /^\w+$/ }],
  password: [
    {
      message: "密码必须包含字母、数字、特殊字符（~！%@#$），密码长度为8-16位",
      pattern:
        /^(?=.*\d+)(?=.*[~!@#$%]+)(?=.*[A-Za-z]+)[0-9a-zA-Z~!@#$%]{8,16}$/,
    },
  ],
});
const userName = ref("");
const password = ref("");
const checkedMemorizeUser = ref(false);
const userNameRef = shallowRef<any>(null);
const userPassword = shallowRef<any>(null);

onMounted(() => {
  const memorizeUser = getCookie("_MEMORIZE_USER");
  if (memorizeUser) userName.value = memorizeUser;

  window.addEventListener("keydown", listenKeydown, false);
});

onUnmounted(() => {
  window.removeEventListener("keydown", listenKeydown, false);
});

// 用户登录
function handleRegister() {
  const v1 = userNameRef.value.validator();
  const v2 = userPassword.value.validator();
  if (v1 === true && v2 === true) {
    login({
      username: userName.value,
      password: encrypto(password.value),
    }).then((response: any) => {
      const { code, data } = response;
      if (code === 0) {
        message.success("登录成功");
        setToken(data.token);
        // 如果用户勾选了【记住用户名】，将保存用户名，有效期一个月（31天）
        checkedMemorizeUser.value &&
          setCookie("_MEMORIZE_USER", userName.value, 2678400);
        queryUserInfo().then((res: any) => {
          if (res.code === 0) navigateToOriginalPage();
        });
      }
    });
  }
}

// 登录完成后的路由重定向
function navigateToOriginalPage() {
  const {
    query: { redirect },
  } = route;

  if (redirect) {
    router.push(decodeURIComponent(redirect as string));
  } else {
    router.push("/");
  }
}

// 当用户点击【Enter】按钮时，触发提交操作。
function listenKeydown(event: any) {
  if (event.code === "Enter") {
    event.stopPropagation();
    event.preventDefault();
    handleRegister();
  }
}
</script>

<template>
  <main class="qm-login">
    <section class="qm-login-container">
      <div class="qm-login-illustration" />
      <div class="qm-login-content">
        <h1 class="qm-login-title">农机作业监管平台</h1>
        <p class="qm-login-subtitle">让农机监管更方便的智能化平台</p>

        <Input
          ref="userNameRef"
          v-model:value="userName"
          type="text"
          autoComplete="off"
          style="margin-top: 100px"
          placeholder="请输入用户名"
          :rules="rules.userName"
          :prefixIcon="UserOutlined"
        />
        <Input
          ref="userPassword"
          v-model:value="password"
          type="password"
          autoComplete="off"
          placeholder="请输入用户密码"
          :rules="rules.password"
          :prefixIcon="LockOutlined"
        />
        <div class="form-item">
          <Checkbox
            v-model:checked="checkedMemorizeUser"
            style="margin-left: 8px"
          />
          <p class="memorize-user-name">记住用户名</p>
        </div>
        <Button type="primary" class="qm-login-submit" @click="handleRegister"
          >登录</Button
        >
      </div>
    </section>
    <div class="login-footer">
      安徽阡陌网络科技有限公司 ©2022 Created by Qianmo
    </div>
  </main>
</template>

<style lang="less">
.qm-login {
  height: 100vh;
  background: url(@/assets/login-bg.png) no-repeat left top / cover;
}
.qm-login-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 1200px;
  height: 700px;
  margin: auto;
  background: #fff;
  border-radius: 30px;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2);
}
.qm-login-illustration {
  width: 614px;
  height: 481px;
  margin-left: 40px;
  background: url(@/assets/login-bg-2.png) no-repeat left top / cover;
}
.qm-login-content {
  flex: 1;
  height: 100%;
  padding: 0 20px;
}
.qm-login-title {
  margin: 0;
  padding: 100px 0 0 0;
  font-weight: normal;
  font-size: 40px;
  color: black;
  line-height: 1;
}
.qm-login-subtitle {
  margin: 20px 0 0 0;
  padding: 0;
  font-size: 18px;
  color: #a9a9a9;
  line-height: 1;
}
.form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  margin-top: 40px;
}
.memorize-user-name {
  margin-left: 15px;
  color: #a9a9a9;
  font-size: 16px;
}
.qm-login-submit {
  height: 66px;
  width: 360px;
  margin-top: 40px;
  font-size: 28px;
  border-radius: 33px;
}
.login-footer {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
  text-align: center;
}
</style>
