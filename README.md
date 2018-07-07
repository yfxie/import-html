include-html.js
===

![](https://circleci.com/gh/yfxie/include-html.svg?style=svg)
![](http://img.badgesize.io/yfxie/include-html/master/include-html.min.js.svg?compression=gzip)

for frontend beginners who didn't know framework to use the include feature in HTML.

Usage
---

1. load the script in HTML:
```
<body>
  ...
  <!-- place before the end of body tag is suggested -->
  <script src="include-html.min.js"></script>
</body>
```

2. prepare template HTML:
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

3. include the template by using HTML comment with special syntax `<!-- include file.html -->`:
```
<body>
  <!-- include header.html -->
  Page content
  <!-- include footer.html -->
</body>
```

4. the page will be:
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
- **Light-weight**: ![](http://img.badgesize.io/yfxie/include-html/master/include-html.min.js.svg)
![](http://img.badgesize.io/yfxie/include-html/master/include-html.min.js.svg?compression=gzip)
- support nested include.
- when all templates loaded, `include-html-loaded` class will be added to `<html>`.

Q&A
---

**Why not use browser native Promise?**

to support legacy browsers like IE.

Todo
---
- [ ] demo page
- [ ] more detail description
- [ ] JS event: loaded
- [ ] can pass variables
- [ ] version control
- [ ] write test