const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export const nanoid = (size = 21, customAlphabet?: string) => {
  let id = '';
  let i = size;
  let alphabet = customAlphabet ?? urlAlphabet;
  while (i--) {
    id += alphabet[(Math.random() * alphabet.length) | 0];
  }
  return id;
};