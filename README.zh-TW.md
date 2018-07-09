import-html.js
===

![](https://circleci.com/gh/yfxie/import-html.svg?style=svg)
[![npm version](https://badge.fury.io/js/import-html.js.svg)](https://badge.fury.io/js/import-html.js)
![](http://img.badgesize.io/yfxie/import-html/master/import-html.min.js.svg?compression=gzip)

在 HTML 內使用 import 的功能。

*其它語言版本: [English](README.md), [繁體中文](README.zh-TW.md).*

使用方法
---

1. 載入 script:
```
<body>
  ...
  <!-- 建議方在 </body> 之前 -->
  <script src="import-html.min.js"></script>
</body>
```

2. 準備 HTML 的模版，
建議將這些模版放到獨立的目錄下:

```
<header>
  <h1>Awesome Page</h1>
</header>
```
```
<footer>
  <p>© 2018 UXabc.</p>
</footer>
```

3. 在主要頁面使用 HTML 的註解 `<!-- import file.html -->`:
```
<body>
  <!-- import header.html -->
  Page content
  <!-- import footer.html -->
</body>
```

4. 瀏覽器運行後，頁面內容將會是:
```
<body>
  <header>
    <h1>Awesome Page</h1>
  </header>
  Page content
  <footer>
    <p>© 2018 UXabc.</p>
  </footer>
</body>
```


Features
---
- **輕量**: ![](http://img.badgesize.io/yfxie/import-html/master/import-html.min.js.svg)
![](http://img.badgesize.io/yfxie/import-html/master/import-html.min.js.svg?compression=gzip)
- 支援巢狀載入（模版內可再使用 `<!-- import ... -->`）
- 模版載入完成後 `import-html-loaded` class 會被加入到 `<html>`.
- 模版載入完成後可觸發 JS 回呼： `ImportHTML.ready(callback)`

Tips
---
某些使用情況，可能會遇到元素跳動的問題，這是因為 import 功能是以非同步執行，你可以用以下這個方法來解決問題：
在 head 裡加入一段 script，把頁面透明度設為 0，等待所有模版都載入完成後再將透明的設定拿掉：

```
<head>
  <!-- import include/head.html -->
  <script>document.documentElement.style.opacity = 0;</script>
</head>
<body>
  ...
  <script src="import-html.min.js"></script>
  <script>
    ImportHTML.ready(function() {
      document.documentElement.style.removeProperty('opacity');
    });
  </script>
</body>

```

Q&A
---

**為何不使用瀏覽器內建的 Promise?**

為了支援老舊瀏覽器
