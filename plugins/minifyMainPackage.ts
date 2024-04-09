import TerserPlugin from 'terser-webpack-plugin';

import type { IPluginContext } from '@tarojs/service';

module.exports = (ctx: IPluginContext) => {
  ctx.modifyWebpackChain(args => {
    const chain = args.chain;
    // chain.optimization.delete('minimizer')
    chain.optimization.minimize(true);
    chain.optimization.minimizer('minifyMainPackage').use(TerserPlugin, [{
      parallel: true,
      terserOptions: {
        compress: true, // 默认使用terser压缩
        // mangle: false,
        keep_classnames: true, // 不改变class名称
        keep_fnames: true, // 不改变函数名称
      },
    }])
  })
}