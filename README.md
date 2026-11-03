# Commonplace · 赵浩源

这是 Web Technologies 第 2–4 课复习作业，采用原生 HTML、CSS、JavaScript。
姓名：赵浩源。邮箱：X20250010@stu.hibiuh.edu.cn。

## 如何打开

1. 在 VS Code 中打开桌面的 `web.class.quotes` 文件夹。
2. 安装 **Live Server** 扩展（作者 Ritwick Dey）。
3. 右键 `index.html`，选择 **Open with Live Server**。
4. 地址应该以 `http://127.0.0.1:` 开头。不要双击 HTML 以 `file://` 打开，因为浏览器会阻止 `fetch` 读取导航和页脚。

备用方法：在这个文件夹的终端运行 `python -m http.server 5500`，再打开 `http://127.0.0.1:5500`。按 Ctrl+C 停止。

## 文件和作业要求

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页、原创主图、其他三个页面的入口 |
| `quotes.html` | 20 条名言，10 条英文、10 条中文；每条有作者和出处，中文附英文学习译文 |
| `project.html` | 5 个项目想法，使用 ul；每个想法的目标用户，使用 dl；实现步骤，使用 ol |
| `about.html` | 个人介绍、学习内容、联系邮箱及 contact 锚点 |
| `style.css` | 所有页面共用的配色、字体、卡片和响应式布局 |
| `nav.html` | 共用导航片段；增加页面时只需在这里加导航链接 |
| `footer.html` | 共用页脚片段；包含姓名和邮箱 |
| `nav.js` | 用 fetch 加载导航与页脚，并高亮当前页面 |
| `likes.js` | 每条名言独立点赞/取消点赞；计数为当前访问者的 0 或 1，刷新重置 |
| `quotes.js` | 按名言原文语言筛选，以及在当前筛选结果中随机选一条 |
| `favicon-32.png` | 32 × 32 浏览器图标 |
| `apple-touch-icon.png` | 独立绘制的 180 × 180 手机图标 |
| `images/hero.svg` | 为本站制作的原创矢量书本山景插图，不依赖外链图片 |
| `doctory.html` | 你最初的空白文件，保留原样；网站入口是 index.html |

关于页里的项目介绍和五个项目想法是课程草稿，请按你的真实兴趣修改。如果老师要求你本人拍摄的照片，可将主图换成自己的照片，并更新 index.html 的图片路径和 alt 描述。当前主图为原创插图，没有冒充个人照片。

## HTML 的关键点

- `<!DOCTYPE html>`：让浏览器使用现代标准模式。
- `lang="en"`：页面的主要语言是英语。中文段落和姓名单独标记 `lang="zh"`。
- `charset="UTF-8"`：正确显示中文。
- `viewport`：让手机按照屏幕实际宽度布局。
- 每页只有一个 h1，后面按 h2、h3 分层。
- `header`、`main`、`footer` 分别表示页头、主要内容、页脚。
- 每条名言用 `article` 包裹；`blockquote` 表示引用；`cite` 表示作品/来源标题；作者单独放在 span 中。
- `<a>` 用来跳到其他页面；`<button>` 用来执行点赞或随机选择。
- 图片都有 alt。点击“Let’s talk”会跳到 `about.html#contact`。
- nav.html 和 footer.html 是片段，不需要 doctype、html、head。做 HTML 校验时校验完整页面。

## likes.js 逐句解释

1. `document.querySelectorAll('.like-button')` 找到所有点赞按钮。
2. `const likeButtons = ...` 用变量保存这组按钮。
3. `likeButtons.forEach(function (button) { ... })` 对每个按钮执行相同的设置。
4. `button.addEventListener('click', function () { ... })` 注册点击事件；点击时才执行内部代码。
5. `button.getAttribute('aria-pressed') === 'true'` 检查按钮是否已选中。属性返回字符串，因此与 `'true'` 比较。
6. `const liked = !alreadyLiked` 用逻辑非把状态反转：未点赞变为点赞，已点赞变为取消。
7. `button.setAttribute('aria-pressed', String(liked))` 更新按钮状态，屏幕阅读器也能识别。
8. `button.querySelector('.heart')` 只查找当前按钮内部的心形，不会修改其他名言。
9. `liked ? '♥' : '♡'` 是三元表达式：条件为真使用左侧值，否则使用右侧值。
10. `.textContent = ...` 更新心形、文字和计数；`textContent` 将内容当作文本，而不是 HTML。
11. `button.disabled = false` 在事件绑定成功后启用按钮。
12. 没有数据库，也没有 localStorage，所以刷新页面时恢复 HTML 里的初始值 0。

## nav.js 的流程

`load(file, target)` 是一个可复用函数：接收文件名和容器 id → fetch 请求文件 → 检查 response.ok → response.text() 读取文字 → innerHTML 插入片段。函数分别调用两次，加载导航与页脚。这就是 DRY（Don't Repeat Yourself）。

加载导航以后，用 `window.location.pathname` 取当前地址里的文件名，和导航链接的 href 比较；匹配的链接加上 `aria-current="page"`，CSS 根据这个属性显示下划线。根地址没有文件名时按 index.html 处理。`.catch()` 捕获读取失败，并给出提示。

## quotes.js 的流程

- `Array.from(...)` 把查询到的名言节点转换为数组，便于使用 filter。
- 每个 article 的 `data-language` 存储原文语言，可以通过 `dataset.language` 读取。
- 下拉菜单触发 change 事件后，匹配项的 hidden 为 false，其他项为 true。
- 随机按钮只从未隐藏的名言里选择，避免选到当前语言筛选之外的名言。
- `Math.random()` 产生 [0, 1) 范围的随机数，乘候选数后由 Math.floor 向下取整得到数组下标。
- 候选项超过一个时排除上一次选中的名言，避免连续重复。
- 选中后加边框、滚动到卡片，并将键盘焦点移过去；状态文字也会更新。
- 用户开启“减少动态效果”时，滚动使用即时定位。

## CSS 的关键点

- `:root` 中的变量集中控制颜色。
- `box-sizing: border-box` 让宽度包含内边距和边框。
- `display: grid` 和 `grid-template-columns` 用来建立列布局。
- 名言在大于 800px 时显示两列，800px 及以下显示一列。
- `gap` 是卡片之间的间距；padding 是卡片内部留白；margin 是元素外部留白。
- `#site-footer` 只选中整站页脚，不会误改名言内部的 footer。
- `:focus-visible` 给键盘操作显示清晰焦点；`[hidden]` 保证筛选掉的内容不显示。

## 自己演示时检查

1. 依次打开四页，确认导航、页脚和当前页面标记。
2. 在 Quotes 页点赞，再点一次取消；筛选语言后点赞状态仍保留，刷新重置。
3. 选 English 或中文，确认各显示 10 条；All languages 显示 20 条。
4. 点击 Surprise me，确认定位到当前语言中的一条名言，再点一次不会立刻重复。
5. 将浏览器缩到手机宽度，检查单列布局、无横向溢出。
6. 用 Tab 和 Enter/Space 操作链接、选择框和按钮。
7. 在开发者工具中查看 Console 和 Network，确认无报错、无 404。

参考课程：https://webtech.landrock.io/slides/recap-2-4.html
