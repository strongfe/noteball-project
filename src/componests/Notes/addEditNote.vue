<template>
  <div class="flex flex-col p-2 mb-3" :class="bgColor">
    <label
      v-if="label"
      class="text-white pl-1"
    >
      {{label}}
    </label>
    <div class="relative">
      <textarea
        :placeholder="props.placeholder"
        :value="modelValue"
        @input="updateValue"
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
        ref="newNoteRef"
        maxlength="100"
        v-autofocus
        rows="4"
      />
    </div>
    <div class="flex items-center justify-end space-x-1">
      <!-- 작은 Submit 버튼 -->
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // ref를 vue로부터 import
import { vAutofocus } from '@/directives/vAutofocus';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: "bg-green-500"
  },
  placeholder: {
    type: String,
    default: 'Type something...'
  },
  label: {
    type: String,
  }
});

const emit = defineEmits(['update:modelValue'])

// 부모에게 이벤트를 전달하여 modelValue를 업데이트
const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

// 텍스트에리어를 위한 ref
const newNoteRef = ref(null);

// 텍스트에리어에 포커스를 설정하는 메서드
const focusTextarea = () => {
  newNoteRef.value.focus();
};

// focusTextarea 메서드를 외부에서 접근 가능하게 노출
defineExpose({
  focusTextarea
});


</script>