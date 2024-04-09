<template>
  <nut-config-provider :theme-vars="themeVars">
    <slot></slot>
  </nut-config-provider>
</template>

<script lang="ts" setup>

const themeVars = {
  primaryColor: '#50FE82',
  primaryColorEnd: '#50FE82',
  helpColor: '#FFC626',
  titleColor: '#0D0F02',
  titleColor2: '#404040',
  textColor: '#4B4D45',
  buttonBorderRadius: '53px',
  buttonLargeHeight: '48px',
  buttonLargeLineHieght: '48px',
  buttonLargeFontSize: '18px',
  buttonDefaultHeight: '44px',
  buttonDefaultLineHeight: '44px',
  buttonDefaultFontSize: '16px',
  buttonPrimaryColor: 'var(--nut-title-color)',
  navbarMarginBottom: '0',
  navbarBackground: 'transparent',
  navbarBoxShadow: 'none',
  overlayBgColor: 'rgba(0, 0, 0, .6)',
  tabbarHeight: '77px',
  tabbarBorderTop: 'none',
  tabbarBorderBottom: 'none',
  tabbarItemTextFontSize: '12px',
  tabbarItemTextLineHeight: '17px',
  tabbarWordMarginTop: '4px',
  checkboxLabelMarginLeft: '4px',
  tabsTitlesItemColor: '#666',
  tabsHorizontalTitlesHeight: '42px',
  tabsHorizontalTitlesItemMinWidth: '24px',
  tabsHorizontalTitlesItemActiveLineWidth: '24px',
  tabsHorizontalTabLineColor: '#51FE81',
  tabsTitlesBackgroundColor: '#fff',
  tabsTitlesItemLineBorderRadius: '16px',
  popupBorderRadius: '16px',
};
</script>