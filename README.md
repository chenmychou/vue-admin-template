### 启动项目

* 开发环境 `npm install && npm run dev`
服务将开启在localhost:9528端口，测试环境或开发环境需要更改`config`目录下的`index.js`下`dev`的`proxyTable`,有配置示例

* 生产环境 `npm install && npm run build`,会生成dist静态目录，将dist目录放入生产环境nginx配置下的80端口，并将nginx配置文件配成端口转发到本地的8095端口，重启nginx即可

> tips:    
src目录下的components是常用组件，没用到的留着也没关系，因为webpack打包后会自动去掉没有用到的组件或者模块