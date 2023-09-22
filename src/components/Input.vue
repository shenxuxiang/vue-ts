<script setup lang="ts">
import { isEmpty } from "@/utils";
import { ref, computed, toRef } from "vue";
import type { CSSProperties } from "vue";

type Rule =
  | { pattern: RegExp; message: string }
  | ((input: string) => true | string);

type InputOptioins = {
  type?: string;
  prefixIcon: any;
  placeholder?: string;
  style?: CSSProperties;
  class?: string;
  value?: string;
  rules?: Rule[];
  "update:value"?: (...args: any) => void;
};

const props = withDefaults(defineProps<InputOptioins>(), {
  type: "text",
  placeholder: "请输入内容",
  inputValue: "",
});
const emit = defineEmits(["update:value"]);
defineOptions({ inheritAttrs: false });
const className = toRef(props, "class");
const inputRef = ref<any>(null);
const errorText = ref("");
const status = ref<"success" | "error">("success");

const inputValue = computed({
  get: function () {
    return props.value!;
  },
  set: function (value: string) {
    emit("update:value", value);
    inputValidator(value, props.rules!);
  },
});

// 对用户的输入内容进行验证；
function inputValidator(value: string, rules: Rule[]) {
  if (isEmpty(rules)) return true;

  let result: true | string = true;

  for (let i = 0; i < rules?.length; i++) {
    const rule = rules[i];
    if (typeof rule === "function") {
      result = rule(value);
      if (result === true) {
        continue;
      } else {
        break;
      }
    } else {
      const { pattern, message } = rule;
      if (pattern.test(value)) {
        continue;
      } else {
        result = message;
        break;
      }
    }
  }

  if (result === true) {
    status.value = "success";
  } else {
    status.value = "error";
    errorText.value = result;
  }
  return result;
}

defineExpose({
  input: inputRef,
  validator: () => inputValidator(inputRef.value.value, props.rules as any),
});
</script>

<template>
  <div :style="style" :class="[className, 'qm-input-x']">
    <transition name="fade">
      <p v-show="status === 'error'" class="error-tips">{{ errorText }}</p>
    </transition>
    <component :is="prefixIcon" class="qm-input-prefix-icon" />

    <input
      ref="inputRef"
      v-bind="$attrs"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :class="['qm-input', { passwd: type === 'password' }]"
    />
  </div>
</template>

<style lang="less">
.qm-input-x {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 360px;
  height: 44px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  & + & {
    margin-top: 40px;
  }
}
.qm-input-prefix-icon {
  display: inline-flex;
  align-items: flex-start;
  font-size: 32px;
  color: #4f93fe;
}
.qm-input {
  flex: 1;
  height: 32px;
  padding: 8px 12px;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 1px;
  border: none;
  outline: none;
  box-sizing: border-box;
  &.passwd {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 3px;
    padding: 6px 12px;
  }
}

.qm-input::placeholder,
.qm-input::-webkit-input-placeholder {
  color: #a9a9a9;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 1px;
}

.error-tips {
  position: absolute;
  top: 15px;
  font-size: 14px;
  color: #ff0000;
  opacity: 1;
  transform: translateY(20px);
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: none;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(0);
  opacity: 0;
}
</style>
