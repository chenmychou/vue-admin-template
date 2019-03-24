export default {
  route: {
    dashboard: '首页',
    permission: '系统管理',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单1-1',
    'menu1-2': '菜单1-2',
    'menu1-2-1': '菜单1-2-1',
    'menu1-2-2': '菜单1-2-2',
    'menu1-3': '菜单1-3',
    menu2: '菜单2',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链'
  },
  navbar: {
    logOut: '退出',
    dashboard: '首页',
    github: '项目地址',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 Tab 组件或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    addsingle: "单次入库",
    addmore: '批量导入',
    id: '序号',
    uid: '欧盟序号',
    kid: '韩国序号',

    addCompany: '新增企业',
    addUser: '新增用户',
    addMaster: '新增专家',

    userSearch: '输入用户名搜索',

    chinaName: '中文名',
    englishName: '英文名',
    sourceCas: 'cas号',
    sourceCi: 'ci号',
    chinaId: '中国序号',
    checkItem: '查看',
    edit: '编辑',
    delete: '删除',
    "companyId": '公司id',
    "companyName": "公司名称",
    "cardNo": "企业信用代码",
    cardPic: '营业执照',
    "headName": "负责人",
    "phone": "电话",
    "isDelete": "是否禁用",
    "userId": '用户ID',
    "account": "账号",
    "userName": "用户名",
    "userPhone": "电话",
    "headImg": "头像",
    "userTitle": "职称",
    "goodField": "擅长领域",
    "expertIsCert": "是否认证",
    loginTime: '最近一次登录',
    createTime: "添加时间",
    userPassword: '用户密码',
    // 问题相关
    // 提问人姓名，企业名称，提问人职称，问题，是否回答，问题是否公开，审核状态，提问时间，（查看，删除，评论列表）
    // "userName": "用户名",
    // "userTitle": "职称",
    // "companyName": "公司名称",
    
    isAnswer: '是否回答',
    isOpen: '是否公开',
    questionStatus: "问题审核状态",
    questionTime: '提问时间',
    commetsList: '评论列表',
    content:'问题描述',
    questionDetail:'问题详情',
    questionPics: "问题图片",
    // 评论详情
    // 显示提问人姓名，企业名称，提问人职称，问题，问题资源图片，问题是否回答，问题是否公开，审核状态，提问时间


    // 评论相关
    // 评论人姓名  评论内容 评论时间  审核操作 删除操作
    // "userName": "张三",
    "commentContent": "评论内容",
    commetStatus: "评论审核状态",
    commetDetail: '评论详情',
    // "createTime": 6456546
    // "status": 1,

    // 评论详情
    // 评论人ID, 头像，姓名，（企业用户显示职称，专家显示头衔），评论时间，评论内容，评论的资源图片，被评论的（评论ID，评论人姓名），评论审核状态

    "commentId": "评论人ID",
    "userHeadImg": "头像",
    // "userName": "张三",
    // "userTitle": "职称、头衔",
    "commetTime": "评论时间",
    commentPics: '评论图集',
    replyUserName: '被评论者',
    replyId: '被评论者ID',
    // status: '审核状态'



    

    // "commentPics": "http://aa.baidu.com/aaa.jpg,http://aa.baidu.com/bbb.jpg",
    // "userId": 1001,
    // "userType": 3,
    // "userTitle": "高级工程师",



    // 问题反馈

    "feedbackId": "问题序号",
    // "userName": "反馈用户",
    "userType": "用户类型", // 用户类型（2-专家，3-企业用户）
    "content": "反馈内容",  // 反馈内容

    // 管理员
    // 管理员ID，管理员姓名，账号，密码，最后登录时间，管理员状态（正常，禁用）可编辑修改，可删除；

    addAdmin: "新增管理员",
    "adminId": "管理员ID",
    "account": "管理员账号",
    "adminName": "管理员姓名",
    "adminPassword": "管理员密码",
    "adminPhone": "管理员手机号",
    "status": "是否禁用",
    "createTime": "创建时间",
    "adminType": "管理员类型", // 管理员类型（1-超级管理员，2-普通管理员）
    "lastLoginTime": "最后登录时间",



    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    publish: '发布',
    draft: '草稿',
    cancel: '取 消',
    confirm: '确 定'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
