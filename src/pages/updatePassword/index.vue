<template>
  <main class="qm-login">
    <section class="qm-login-container">
      <div class="qm-login-illustration" />
      <div class="qm-login-content">
        <h1 class="qm-login-title">农机作业监管平台</h1>
        <p class="qm-login-subtitle">让农机监管更方便的智能化平台</p>
        <Input
          ref="passwordRef"
          v-model:value="password"
          type="password"
          autoComplete="off"
          style="margin-top: 80px"
          placeholder="请输入旧密码"
          :rules="rules.password"
          :prefixIcon="LockOutlined"
        />
        <Input
          ref="newPasswordRef"
          v-model:value="newPassword"
          type="password"
          autoComplete="off"
          placeholder="请输入新密码"
          :rules="rules.newPassword"
          :prefixIcon="LockOutlined"
        />
        <Input
          ref="confirmPasswordRef"
          v-model:value="confirmPassword"
          type="password"
          autoComplete="off"
          placeholder="请再次确认密码"
          :prefixIcon="LockOutlined"
          :rules="rules.confirmPassword"
        />

        <Button type="primary" class="qm-login-submit" @click="handleRegister"
          >修改密码</Button
        >
      </div>
    </section>
    <div class="login-footer">
      安徽阡陌网络科技有限公司 ©2022 Created by Qianmo
    </div>
  </main>
</template>

<script setup lang="ts">
import { shallowRef, ref, shallowReactive, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/Input.vue";
import { Button, message } from "ant-design-vue";
import { LockOutlined } from "@ant-design/icons-vue";
import { encrypto } from "@/utils";
import { updatePassword } from "@/services/login";

const router = useRouter();
const rules = shallowReactive({
  password: [
    {
      message: "密码必须包含字母、数字、特殊字符（~！%@#$），密码长度为8-16位",
      pattern:
        /^(?=.*\d+)(?=.*[~!@#$%]+)(?=.*[A-Za-z]+)[0-9a-zA-Z~!@#$%]{8,16}$/,
    },
  ],
  newPassword: [
    {
      message: "密码必须包含字母、数字、特殊字符（~！%@#$），密码长度为8-16位",
      pattern:
        /^(?=.*\d+)(?=.*[~!@#$%]+)(?=.*[A-Za-z]+)[0-9a-zA-Z~!@#$%]{8,16}$/,
    },
  ],
  confirmPassword: [
    function (input: string) {
      if (newPasswordRef.value.input.value !== input)
        return "两次输入的密码不一致！";
      return true;
    },
  ],
});
const password = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const passwordRef = shallowRef<any>(null);
const newPasswordRef = shallowRef<any>(null);
const confirmPasswordRef = shallowRef<any>(null);

onMounted(() => {
  window.addEventListener("keydown", listenKeydown, false);
});

onUnmounted(() => {
  window.removeEventListener("keydown", listenKeydown, false);
});

// 用户登录
function handleRegister() {
  const v1 = passwordRef.value.validator();
  const v2 = newPasswordRef.value.validator();
  const v3 = confirmPasswordRef.value.validator();
  if (v1 === true && v2 === true && v3 === true) {
    const params = {
      oldPassword: encrypto(password.value),
      newPassword: encrypto(newPassword.value),
      confirmPassword: encrypto(confirmPassword.value),
    };
    updatePassword(params).then((response: any) => {
      if (response.code === 0) {
        window.localStorage.clear();
        message.success("密码修改成功");
        router.push("/login");
      }
    });
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
