// vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
     // /例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。基本路径
     // 部署生产环境和开发环境下的URL，默认应用是被部署在一个域名的根路径上
   baseUrl: '/',
 //在npm run builds时生成文件的目录名称，输出文件目录
  outputDir: 'dist',
  devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000/api/',
                changeOrigin: true,
                ws: true,
                
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    },
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}