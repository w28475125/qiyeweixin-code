const routes = [
  { path: "/", redirect: "/newsIndex" },
  {
    path: "/newsIndex",
    name: "newsIndex",
    component: () =>
      import(/* webpackChunkName: "newsIndex" */ "@/views/newsIndex"),
    meta: {
      title: "新闻"
    }
  },
  {
    path: "/newsDetail",
    name: "newsDetail",
    component: () =>
      import(/* webpackChunkName: "newsIndex" */ "@/views/newsIndex/detail"),
    meta: {
      title: "新闻详情"
    }
  },
  {
    path: "/fileList",
    name: "fileList",
    component: () =>
      import(/* webpackChunkName: "descView" */ "@/views/descView/fileList"),
    meta: {
      title: "最新文件"
    }
  },
  {
    path: "/descView",
    name: "descView",
    component: () =>
      import(/* webpackChunkName: "descView" */ "@/views/descView"),
    meta: {
      title: "文档浏览"
    }
  }
];

export default routes;
