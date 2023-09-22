import { defineComponent, h, toRaw, cloneVNode } from "vue";
import { Input, Select, DatePicker, Cascader } from "ant-design-vue";

export default defineComponent(
  (props, { emit }) => {
    // 对于一些需要响应式的数据，不应该使用对象解构
    const {
      title,
      watch,
      formType,
      formModel,
      component,
      properties,
      placeholder,
    } = props;

    function onChange(event: any) {
      const value = event?.type ? event.target.value : event;
      emit("update:value", value);
      watch?.(value, toRaw(formModel));
    }

    if (formType === "input") {
      return () =>
        h(Input, {
          ...properties,
          onChange,
          value: props.value,
          placeholder: placeholder || `请输入${title}`,
        });
    } else if (formType === "select") {
      return () =>
        h(Select, {
          ...properties,
          onChange,
          value: props.value,
          options: props.options,
          placeholder: placeholder || `请选择${title}`,
        });
    } else if (formType === "rangePicker") {
      const { RangePicker } = DatePicker;
      return () =>
        h(RangePicker, {
          ...properties,
          onChange,
          value: props.value,
          style: "width: 100%",
          placeholder: placeholder ?? ["开始时间", "结束时间"],
        });
    } else if (formType === "datePicker") {
      return () =>
        h(DatePicker, {
          ...properties,
          onChange,
          value: props.value,
          style: "width: 100%",
          placeholder: placeholder ?? "请选择查询时间",
        });
    } else if (formType === "cascader") {
      return () => {
        return h(Cascader, {
          ...properties,
          onChange,
          value: props.value,
          options: props.options,
          placeholder: placeholder ?? `请选择${title}`,
        });
      };
    } else if (typeof component === "function") {
      return () =>
        cloneVNode(component(), {
          onChange,
          placeholder,
          value: props.value,
        });
    }

    return () => null;
  },
  {
    props: [
      "title",
      "formType",
      "component",
      "properties",
      "options",
      "watch",
      "placeholder",
      "formModel",
      "value",
    ],
    emits: ["update:value"],
  },
);
