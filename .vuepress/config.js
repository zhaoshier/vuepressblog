module.exports = {
  "title": "zhaoshier Blog",  //博客标题
  "description": "blog",
  "dest": "public",  //博客部署时的输出文件夹
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/earth.png"
      }
    ],
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
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
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
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.wangjinshan.top/"
      },
      {
        "title": "林梧桐",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://www.lynnwutong.top"
      },
      {
        "title": "Sweny",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
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
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}