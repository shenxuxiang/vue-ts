<script setup lang="ts">
  import { EyeOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons-vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  import Upload from './upload';

  /**
   * 动画效果函数
   * @params t { number } 动画已执行次数
   * @params b { number } 当前位置
   * @params c { number } 变化量 目标位置 - 当前位置
   * @params d { number } 动画共需要执行多少次
   * @return { number }
   * @author shenxuxiang
   */
  const easeIn = (t: number, b: number, c: number, d: number) => (t === 0 ? b : c * 2 ** (10 * (t / d - 1)) + b);

  type RenderItemProps = {
    uid: string;
    url?: string;
    name: string;
    action: string;
    response?: any;
    method?: string;
    rowSource?: File;
    percent?: number;
    headers?: () => { [key: string]: any };
    status?: 'loading' | 'done' | 'error' | 'remove';
  };

  type RenderItemEmits = {
    (e: 'remove', uid: string): void;
    (e: 'preview', uid: string): void;
    (e: 'error', uid: string, err: any): void;
    (e: 'success', uid: string, res: any): void;
  };

  const emit = defineEmits<RenderItemEmits>();
  const props = withDefaults(defineProps<RenderItemProps>(), {
    percent: 100,
    status: 'done',
    method: 'POST',
  });

  const imgURL = ref('');
  const itemRef = ref<HTMLLIElement>();
  const cvsRef = ref<HTMLCanvasElement>();
  const ctxRef = ref<CanvasRenderingContext2D | null>();
  const uploadInstance = ref<XMLHttpRequest | null>();

  // canvas 初始化
  onMounted(() => {
    // 在元素刚刚挂载到 DOM 节点时，添加一个渐入式的动画。
    itemRef.value?.classList.add('enter-from')
    requestAnimationFrame(() => itemRef.value?.classList.remove('enter-from'));

    if (props.url) {
      imgURL.value = props.url;
    } else if (props.rowSource) {
      // 预先添加了一个图片预加载的功能，在网络不太流畅时可以让图片尽早的展示出来。
      const reader = new FileReader();
      reader.readAsDataURL(props.rowSource);
      reader.onload = () => {
        imgURL.value = reader.result as string;
      }
    }

    if (!props.url && props.status === 'loading') {
      initialCanvas();
      uploadFile();
    }
  });

  onUnmounted(() => {
    // 销毁画布
    ctxRef.value = null;
    // 取消请求
    if (uploadInstance.value) uploadInstance.value.abort();
  });

  // 开始上传图片
  function uploadFile() {
    if (props.uid && props.status === 'loading' && props.rowSource) {
      const formData = new FormData();
      formData.append('file', props.rowSource);

      const upload = new Upload({ headers: props.headers });

      let isUploadStart = true;

      // 更新上传进度
      upload.onProgress(function(progress: number) {
        // 如果一开始上传的时候，progress 就大于等于 1，说明网速足够快上传图片瞬间就完成了，
        // 此时，我们使用动画完成进度条，否则就是每次 onProgress 事件触发 updateProgressBar
        if (isUploadStart && progress >= 1) {
          progressBarAnimation();
        } else {
          updateProgressBar(progress);
        }

        isUploadStart = false;
      });

      // 上传成功
      upload.onSuccess(async function(res: any) {
        fadeInAnimation();
        emit('success', props.uid, res);
        uploadInstance.value = null;
      });

      // 上传失败
      upload.onError(function(err: any) {
        emit('error', props.uid, err);
        uploadInstance.value = null;
      });

      // 将 xhr 实例对象赋值给 uploadInstance，在组件卸载时如果请求还没有完成将会取消请求。
      uploadInstance.value = upload.create(props.action, props.method, formData);
    }
  }

  // canvas 画布初始化
  function initialCanvas() {
    cvsRef.value!.width = 84;
    cvsRef.value!.height = 84;
    const ctx = ctxRef.value = cvsRef.value?.getContext('2d')!;

    ctx.save();
    ctx.translate(42, 42);
  }

  // 进度条自动更新动画
  function progressBarAnimation(callback?: Function) {
    let count = 1;
    (function loop() {
      if (count >= 100) return callback?.();
      count += 3;
      count = Math.ceil(easeIn(count, count, 100 - count, 100));
      updateProgressBar(count / 100);
      requestAnimationFrame(loop);
    })();
  }

  // 更新进度条
  function updateProgressBar(progress: number) {
    if (!ctxRef.value) return;

    const ctx = ctxRef.value;

    ctx.clearRect(-42, -42, 84, 84);

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.fillRect(-42, -42, 84, 84);
    
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 1.5, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#1677ff';
    ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 2 * progress - 0.5 * Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'normal normal normal 14px arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillText((progress * 100).toFixed(0) + '%', 0, 0);
  }

  // 图片展示（渐入动画）
  function fadeInAnimation() {
    if (cvsRef.value) {
      cvsRef.value.style.display = 'none';
      // @ts-ignore
      cvsRef.value.parentNode.classList.toggle('fade-in');
      setTimeout(() => {
        if (cvsRef.value?.parentNode) {
          // @ts-ignore
          cvsRef.value.parentNode.style.display = 'none';
        }
      }, 300);
    }
  }

  function handleRemove(uid: string) {
    // 添加离开时的动画效果
    itemRef.value?.classList.add('leave-from');
    requestAnimationFrame(() => {
      itemRef.value?.classList.remove('leave-from');
      itemRef.value?.classList.add('leave-active');
    });

    setTimeout(() => emit('remove', uid), 300);
  }
</script>

<template>
  <li ref="itemRef" :class="['qm-vnit-upload-image-item', { error: status === 'error' }]">
    <!-- 进度条 -->
    <div 
      class="qm-vnit-upload-image-item-progress" 
      :style="{ display: status === 'error' ? 'none' : ''}"
    >
      <canvas ref="cvsRef" style="width: 84px; height: 84px;"/>
    </div>

    <!-- 上传失败 -->
    <div v-if="status === 'error'" class="qm-vnit-upload-image-item-error">
      <PictureOutlined style="font-size: 36px; color: #ff4d4f"/>
      <p>{{ name }}</p>
    </div>

    <!-- 图片展示 -->
    <div v-else-if="status === 'done'" class="qm-vnit-upload-image-item-preview">
      <slot name="itemRender" :src="imgURL">
        <img :src="imgURL" class="qm-vnit-upload-image-item-preview-content"/>
      </slot>
    </div>

    <!-- 可操作区域 -->
    <div class="qm-vnit-upload-image-item-mask">
      <!-- 删除按钮 -->
      <DeleteOutlined class="qm-vnit-upload-image-item-remove-icon" @click="handleRemove(uid)"/>
      <!-- 预览按钮 -->
      <EyeOutlined 
        v-if="status === 'done'" 
        class="qm-vnit-upload-image-item-preview-icon" 
        @click="$emit('preview', imgURL)"
      />
    </div>
    <div class="qm-vnit-upload-image-item-tips">上传失败</div>
  </li>
</template>

<style lang="less">
  .qm-vnit-upload-image-item {
    flex-shrink: 0;
    position: relative;
    width: 102px;
    height: 102px;
    margin: 0 8px 8px 0;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    opacity: 1;
    transition: opacity .3s ease .08s;
    &.enter-from {
      opacity: 0;
      transition: none;
    }
    &.leave-from {
      opacity: 0;
      transition: none;
    }
    &.leave-active {
      width: 0;
      margin-right: 0;
      padding: 8px 0;
      opacity: 0;
      transform-origin: left top;
      transition: all .3s ease;
    }
    &.error {
      border-color: #ff4d4f;
    }
  }

  .qm-vnit-upload-image-item-progress {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 84px;
    height: 84px;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 84px;
      height: 84px;
      border-radius: 50%;
      box-shadow: 0 0 0 999px #ddd;
      visibility: hidden;
      transform: scale(0.2);
    }
    &.fade-in::after {
      visibility: visible;
      transform: scale(1.42);
      transition: transform 300ms ease-out;
    }
  }

  .qm-vnit-upload-image-item-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff;
    & .qm-vnit-upload-image-item-preview-content {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  .qm-vnit-upload-image-item-error {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff;
    & p {
      margin: 6px 0 0;
      padding: 0;
      font-size: 14px;
      color: #ff4d4f;
    }
  }

  .qm-vnit-upload-image-item-mask {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 84px;
    height: 84px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition: all .5s ease;
    box-sizing: border-box;
  }
  .qm-vnit-upload-image-item:hover .qm-vnit-upload-image-item-mask {
    transition-delay: 50ms;
    visibility: visible;
    opacity: 1;
  }
  .qm-vnit-upload-image-item-remove-icon, .qm-vnit-upload-image-item-preview-icon {
    font-size: 20px; 
    color: #fff;
    opacity: 0.7;
    cursor: pointer;
    user-select: none;
    transition: opacity .3s ease;
    &:hover {
      opacity: 1;
    }
  }
  
  .qm-vnit-upload-image-item-tips {
    position: absolute;
    top: -40px;
    left: 0;
    width: 100px;
    height: 32px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    border-radius: 6px;
    background: #333;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5);
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
    transition: all .3s ease;
    transition-property: opacity visibility transform;
    transition-duration: 300ms 300ms 300ms;
    transition-timing-function: cubic-bezier(0,1,.69,1) cubic-bezier(0,1,.69,1) ease;
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 42px;
      z-index: 1;
      border-top: 8px solid #333;
      border-right: 8px solid #333;
      border-bottom: 8px solid transparent;
      border-left: 8px solid transparent;
      background: transparent;
      transform: rotate(135deg);
    }
  }
  .qm-vnit-upload-image-item.error:hover .qm-vnit-upload-image-item-tips {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition-delay: 50ms;
  }
</style>
