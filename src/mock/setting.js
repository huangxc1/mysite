import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "",
    siteTitle: "我的个人空间",
    github: "https://github.com/dashboard",
    qq: "1171710619",
    qqQrCode:
      "",
    weixin: "天线宝宝",
    weixinQrCode:
      "",
    mail: "1171710619@qq.com",
    icp: "黑ICP备17001719号",
    githubName: "前端小黄",
    favicon: "",
  },
});
