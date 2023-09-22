<script setup lang="ts">
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import { Form, Button, Row, Col } from "ant-design-vue";
import RenderFormItem from "./RenderFormItem";
import { isEmpty } from "@/utils";
import type { VNode } from "vue";

const props = withDefaults(defineProps<ContentFormHeadProps>(), {
  showExport: false,
  defaultExpand: true,
  hideResetButton: false,
  submitButtonText: "提交",
});

const emit = defineEmits(["submit", "reset", "export"]);

const { useForm, Item: FormItem } = Form;

export type Cols = 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type QueryList = Array<{
  title: string;
  name?: string;
  properties?: any;
  watch?: Function;
  formType?: string;
  component?: () => VNode;
  initialValue?: any;
  dataIndex?: string;
  options?: Array<any>;
  placeholder?: string | [string, string];
  dataFormat?: (value: any) => { [propName: string]: any };
}>;

type ContentFormHeadProps = {
  cols?: Cols;
  insertNode?: any;
  queryList: QueryList;
  showExport?: boolean;
  defaultExpand?: boolean;
  submitButtonText?: string;
  hideResetButton?: boolean;
};

// 定义每个 Col 元素的宽度
enum ColSpanEnum {
  xxl = 6,
  xl = 8,
  lg = 8,
  md = 12,
  sm = 12,
  xs = 12,
}

// 容器节点对象
const containerRef = ref<HTMLDivElement>();
// 一行几列
// eslint-disable-next-line
const colsNumber = ref<number>(props?.cols ?? 4);
// 每列占多少个 span
// eslint-disable-next-line
const colSpan = ref(24 / (props?.cols ?? 4));
// 表单数据
const formModel = reactive(initialFormModal());
// 表单对象
const form = useForm(formModel);
// 是否展开
// eslint-disable-next-line
const expand = ref(props.defaultExpand);

onMounted(() => {
  if (typeof props.cols === "undefined") computedColSpan();
});

// 一共多少行
const rowsNumber = computed(() =>
  Math.ceil((props.queryList.length + 1) / colsNumber.value),
);
// 最后一列（提交、收起按钮所在的列）的 offset
const lastFormItemOffset = computed(() => {
  const total = props.queryList.length;
  const cols = colsNumber.value;
  const reset = total % cols;

  if (total < cols) return cols - total - 1;

  if (!expand.value) return 0;

  if (total === cols) return cols - 1;
  return cols - reset - 1;
});

function initialFormModal() {
  return props.queryList.reduce(
    (memo, item) => {
      const { dataIndex, name = dataIndex, initialValue } = item;
      memo[name!] = initialValue || null;
      return memo;
    },
    {} as { [propName: string]: string | number | Array<any> },
  );
}

function computedColSpan() {
  const width = containerRef.value!.offsetWidth;
  let span: number;
  if (width >= 1600) {
    span = ColSpanEnum.xxl;
  } else if (width >= 1200) {
    span = ColSpanEnum.xl;
  } else if (width >= 992) {
    span = ColSpanEnum.lg;
  } else if (width >= 768) {
    span = ColSpanEnum.md;
  } else {
    span = ColSpanEnum.sm;
  }
  colSpan.value = span;
  colsNumber.value = 24 / span;
}

// 表单数据格式化，
function formModelsFormat() {
  const result = { ...formModel };
  props.queryList.forEach((item) => {
    const { dataIndex, name = dataIndex, dataFormat } = item;
    // 如果值为 null、undefined 则删除该数据
    // eslint-disable-next-line
    if (result[name!] == null) {
      delete result[name!];
    } else if (typeof dataFormat === "function") {
      delete result[name!];
      // 先判断表单项是否有值，如果有值则进行数据格式话操作。
      !isEmpty(formModel[name!]) &&
        Object.assign(result, dataFormat(formModel[name!]));
    }
  });
  return result;
}

function handleSubmit() {
  form.validate().then(() => {
    emit("submit", formModelsFormat());
  });
}

function handleReset() {
  form.resetFields();
  emit("reset", formModelsFormat());
}

function handleExport() {
  emit("export", formModelsFormat());
}
</script>

<template>
  <div ref="containerRef" class="content-form-head">
    <Form :model="formModel">
      <Row
        class="content-form-head-row"
        :style="{ height: expand ? `${56 * rowsNumber}px` : '56px' }"
      >
        <template
          v-for="(item, index) in queryList"
          :key="item.name || item.dataIndex"
        >
          <Col
            v-show="expand || (!expand && index + 1 < colsNumber)"
            :span="colSpan"
          >
            <FormItem :name="item.name || item.dataIndex" :label="item.title">
              <RenderFormItem
                v-model:value="formModel[item.name || item.dataIndex!]"
                :title="item.title"
                :watch="item.watch"
                :formModel="formModel"
                :options="item.options"
                :formType="item.formType"
                :component="item.component"
                :properties="item.properties"
                :placeholder="item.placeholder"
              />
            </FormItem>
          </Col>
        </template>

        <Col :offset="lastFormItemOffset * colSpan" :span="colSpan">
          <FormItem>
            <div
              style="
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
              "
            >
              <Button type="primary" @click="handleSubmit">
                {{ submitButtonText }}
              </Button>

              <Button
                v-if="!hideResetButton"
                style="margin-left: 8px"
                @click="handleReset"
              >
                重置
              </Button>

              <Button
                v-if="showExport"
                style="margin-left: 8px"
                @click="handleExport"
              >
                导出
              </Button>

              <slot name="insertNode" />

              <Button
                v-if="queryList.length >= colsNumber"
                type="link"
                @click="expand = !expand"
              >
                {{ expand ? "收起" : "展开" }}
                <UpOutlined v-if="expand" />
                <DownOutlined v-else />
              </Button>
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<style lang="less">
.content-form-head {
  margin-bottom: 24px;
  padding: 24px 24px 0;
  background: #fff;
  border-radius: 8px;
  transition: all 0.2s ease;
  .ant-form-item-control-input-content {
    padding-right: 10px;
  }
  .ant-col.ant-form-item-label {
    min-width: 80px;
  }
}
.content-form-head-row {
  transition: all 0.2s ease;
}
</style>
