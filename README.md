# spider-trending

[![Build Status](https://travis-ci.org/xiedacon/spider-trending.svg?branch=master)](https://travis-ci.org/xiedacon/spider-trending)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

专门用于爬取 [github trending](https://github.com/trending) 的爬虫

### Requirements

* node 越新越好
* redis 2.8+

### Usage

```
修改redis配置文件，添加 notify-keyspace-events Ex 选项

git clone https://github.com/xiedacon/spider-trending.git
cd spider-trending
npm install
npm start
```

### Datas

```js
[
  {
    "name": "language",
    "href": "language href",
    "repos": [
      {
        "author": "repository author",
        "repoName": "repository name",
        "content": "repository introduction",
        "programmingLanguage": "repository language",
        "starTotal": "total star",
        "fork": "fork",
        "starIncrease": "increase star"
      }
    ]
  }
]
```

### TODO

* [x] 定时任务控制
* [x] pm2
* [ ] 部署树莓派
* [ ] 数据分析(一个月后)

### License

[MIT](https://github.com/xiedacon/spider-trending/blob/master/LICENSE)