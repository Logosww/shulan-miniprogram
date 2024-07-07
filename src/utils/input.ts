import Taro from '@tarojs/taro';
import { isRef } from 'vue';

import type { Ref } from 'vue';
import type { InputType } from '@nutui/nutui-taro/dist/types/__VUE/input/types';

export type FieldInputOption = {
  isShortField?: boolean;
  max?: number;
  type?: InputType;
  title: string;
  receiver: {
    form: Record<string, any>;
    field: string;
  } | Ref<string>;
  validator?: (value: string) => Promise<void>;
};

export const handleFieldInput = (option: FieldInputOption) => {
  const { max, type, title, receiver, isShortField, validator } = option;
  Taro.navigateTo({
    url: '/packageB/pages/input/input',
    success: res => {
      let content: string;
      if(isRef(receiver)) content = receiver.value ?? '';
      else {
        const { form, field } = receiver;
        content = form[field] ?? '';
      }
      res.eventChannel.emit('initialize', { title, content, max, type, isShortField, validator })
    },
    events: {
      input: (content: string) => {
        if(isRef(receiver)) receiver.value = content;
        else {
          const { form, field } = receiver;
          form[field] = content;
        }
      }
    },
  });
};