import Taro from '@tarojs/taro';
import { isRef } from 'vue';

import type { Ref } from 'vue';
import type{ InputType } from '@nutui/nutui-taro/dist/types/__VUE/input/type';

export type FieldInputOption = {
  isShortField?: boolean;
  max?: number;
  type?: InputType;
  title: string;
  receiver: {
    form: Record<string, any>;
    field: string;
  } | Ref<string>
};

export const handleFieldInput = (option: FieldInputOption) => {
  const { max, type, title, receiver, isShortField } = option;
  Taro.navigateTo({
    url: '/pages/input/input',
    success: res => {
      let content = '';
      if(isRef(receiver)) content = receiver.value;
      else {
        const { form, field } = receiver;
        content = form[field];
      }
      res.eventChannel.emit('initialize', { title, content, max, type, isShortField })
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