// postcss配置文件

module.exports = {
  // 配置要使用的postcss插件
  plugins: {
    // 配置使用autoprefixer插件
    // 作用：生成浏览器CSS样式规则前缀
    // VueCLI内部已经配置了autoprefixer插件
    // 所以又配置了一次，所以产生冲突了
    // 'autoprefixer': {//autoprefixer插件的配置
    //   //配置要兼容到的环境信息
    //   browsers:['Android >= 4.0', 'ios >= 8']
    // },

    // 配置postcss-pxtorem插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      // lib-flexible 的 REM 适配方案：把一行分为10份，每份就是十分之一
      // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
      // 我们的设计稿宽度是 750，所以应该设置为 750/10=75
      // 但是Vant建议设置为 37.5， 为什么呢？因为Vant是基于 375 写的
      // 所以必须设置为37.5，唯一的缺点就是使用我们设计稿的尺寸都必须/2
      // 有没有更好的办法
      // 如果是 Vant 样式，就按照 37.5 来转换
      // 如果是 我们自己的样式 样式，就按照 75 来转换
      // 通过查阅文档，我们发现 rootValue 支持两种类型：
      // 数字：固定的数值
      // 函数：可以动态处理返回
      // postcss-pxtorem 处理每个CSS文件的时候，都会来调用这个函数
      // 它会把处理的CSS文件相关的信息通过参数传递给这个函数
      // rootValue({file}) {
      //   //console.log('处理的CSS文件是', file);
      //   return file.indexof('vant') !== -1 ? 37.5 : 75//indexof()用来判断一个字符串里面包含指定的字符串 找到就是索引，找不到返回-1

      // },

      rootValue: 37.5,
      // 配置要转换的CSS属性
      //* 表示所有
      propList: ['*'],
      // 配置不要转换的CSS资源
      exclude: 'github-markdown'
    }
  }
}
