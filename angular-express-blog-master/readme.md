#作业: SPA--多人博客
##运行npm start或node app.js启动应用

##目录结构说明:
    public: 静态文件目录
    routes: 路由定义文件目录,controller.js文件对其扫描并添加到app
    views:  模板文件目录
    models: 数据库数据类型定义目录,model.js文件对其扫描形成接口db
  
##登录注册复用了上一次的部分代码
    addPost和editPost页面的标签、摘要及分类未实现,填或不填没有影响,只是为了UI看以来不那么突兀

##扩展项:
    1.filter:可根据几个项目搜索,filter posts框失去焦点时自动搜索
    2.分页为自定义的angular指令
    3.详情页面显示了该账号基本信息以及所有的posts
    4.页面右下角的回到顶部按钮
    5.初始加载动画
