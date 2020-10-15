module.exports = {
  "title": "zhaoshier Blog",  //博客标题
  "description": "blog",  //博客描述
  "dest": "public",  //博客部署时的输出文件夹
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/earth.png"
      }
    ],    //博客图标设置
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",    //vuepress挂载的主题
  "themeConfig": {
    "nav": [          //导航标题
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [               //导航子标题
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/zhaoshier",
            "icon": "reco-github"
          }
        ]
      }
    ],
    //侧边栏设置
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,     //在导航栏菜单中所占的位置，默认是2
        "text": "Category" //默认分类
      },
      "tag": {
        "location": 3,
        "text": "Tag"  //默认标签
      }
    },
    //友情链接
    "friendLink": [
      {
        "title": "王叨叨",
        "desc": "无叨叨，不博客！不懂用户体验的前端不是好爸爸……",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://wangdaodao.com/"
      },
      {
        "title": "王金山",
        "avatar": "monsterid",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.wangjinshan.top/"
      },
      {
        "title": "林梧桐",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://www.lynnwutong.top/avatar.jpg",
        "link": "https://www.lynnwutong.top"
      },
      {
        "title": "Sweny",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://www.sunwenyue.top/sweny.jpg",
        "link": "https://swenyy.github.io/"
      }
    ],
    //博客自定义logo
    "logo": "/earth.png",
    //搜索设置
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "zhaoshier",
    "authorAvatar": "/weixin.jpg",
    "record": "大脑一片空白的ITer",
    //项目开始时间
    "startYear": "2020",
    // // 为你的博客设置密钥
    // keyPage: {
    //   keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文，为32位md5
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    //添加评论功能
    "valineConfig": {
      "appId": "W3OJjBH5wC2jrECo5vSMpl97-gzGzoHsz",
      "appKey": "Pql8kzIAps9AGlVWNdDr2qHs",
    }
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    [
      //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
      "cursor-effects",
      {
        size: 3,                    // size of the particle, default: 2
        shape: ['star'],            // shape of the particle, default: 'star'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    [
      //vuepress复制粘贴提示插件P 先安装在配置 npm install vuepress-plugin-nuggets-style-copy --save
      "vuepress-plugin-nuggets-style-copy", {
        copyText: "复制代码",
        tip: {
          content: "复制成功!"
        }
      }],
    [
      //页面滚动时自动激活侧边栏链接
      '@vuepress/active-header-links', {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor'
      }],
    [
      //pwa插件
      '@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: true
      }],
    [
      //音乐播放
      '@vuepress-reco/vuepress-plugin-bgm-player', {
        audios: [
          // 本地文件示例
          {
            name: '장가갈 수 있을까',
            artist: '咖啡少年',
            url: '/bgm/1.mp3',
            cover: '/bgm/1.jpg'
          },
          // 网络文件示例
          {
            name: '강남역 4번 출구',
            artist: 'Plastic / Fallin` Dild',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          },
          {
            name: '用胳膊当枕头',
            artist: '최낙타',
            url: 'https://assets.smallsunnyfox.com/music/3.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
          }
        ],

      }
    ],

    // [
    //   //悬浮框公告
    //   '@vuepress-reco/vuepress-plugin-bulletin-popover', {
    //   body: [
    //     {
    //       type: 'title',
    //       content: '欢迎加入QQ交流群 🎉🎉🎉',
    //       style: 'text-aligin: center;'
    //     },
    //     {
    //       type: 'image',
    //       src: '/rvcode_qq.png'
    //     }
    //   ],
    //   footer: [
    //     {
    //       type: 'button',
    //       text: '打赏',
    //       link: '/donate'
    //     },
    //     {
    //       type: 'button',
    //       text: '打赏',
    //       link: '/donate'
    //     }
    //   ]
    // }]

  ]
}