export const setFormValues = (form: Record<string, any>, values: Record<string, any>, exclude?: string[]) =>
  Object.keys(form).forEach(key => {
    if(exclude?.includes(key)) return;
    
    (form[key] !== values[key]) && (values[key] !== void 0) && (form[key] = values[key]);
  });