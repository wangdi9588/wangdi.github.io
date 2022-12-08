module.exports = {
  title: "WangdExperience",
  titleTemplate: "Vite & Vue powered static site generator",
  description: "一个vue3组件库",
  appearance: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    theme: "material-palenight",
    lineNumbers: true,
  },
  head:[
    ['script',{src:'full.ts',type:"text/javascript" }]
  ],
  themeConfig: {
    siteTitle: "WangdExperience",
    logo: "/R-C.jfif",
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "GuideTest", link: "/guide/test" },
      { text: "gitee", link: "https://gitee.com/geeksdidi" },
      {
        text: "Drop Menu",
        items: [
          {
            items:[{ text: "Item A1", link: "/item-A1" },
            { text: "Item A2", link: "/item-A2" },
            { text: "Item B1", link: "/item-B1" },
            { text: "Item B2", link: "/item-B2" },]
          },
          {
            items:[{ text: "Item A1", link: "/item-A1" },
            { text: "Item A2", link: "/item-A2" },
            { text: "Item B1", link: "/item-B1" },
            { text: "Item B2", link: "/item-B2" },]
          }
        ],
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      },
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
      { icon: "facebook", link: "https://github.com/vuejs/vitepress" },
      { icon: "discord", link: "https://github.com/vuejs/vitepress" },
      { icon: "instagram", link: "https://github.com/vuejs/vitepress" },
      { icon: "linkedin", link: "https://github.com/vuejs/vitepress" },
      { icon: "slack", link: "https://github.com/vuejs/vitepress" },
      { icon: "twitter", link: "https://github.com/vuejs/vitepress" },
      { icon: "youtube", link: "https://github.com/vuejs/vitepress" },
    ],
    vue: {
      reactivityTransform: true
    },
    docFooter: {
      prev: "Pagina prior",
      next: "Proxima pagina",
    },
    footer:{
      message:'欢迎来到，**联盟',
      copyright:'浙A'
    }
  },
};
