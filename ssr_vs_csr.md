# SSR vs CSR rendering architecture
_Exported on 2026/3/12 at GMT+8 16:07:49 from Cursor (2.5.26)_

---

**User**

SSR(server-side rendering) 服务端渲染
CSR(client-side rendering) 客户端渲染

是两种前端渲染架构 他们的核心区别在于 HTML是在服务端生成 还是在客户端生成

请先分析上述我的个人理解是否准确
其次我想要知道 当前的项目 采用的是什么渲染架构呢
换句话说 具体是SSR还是CSR 是哪里在控制呢

---

**Cursor**

你的理解是准确的，我来详细分析一下，然后看看当前项目的情况。

先让我检查一下项目的构建配置，来确定渲染架构。

现在我已经完整地分析了项目的配置文件，下面从两个方面来回答你的问题。

---

## 一、你的理解是否准确

你的理解**基本准确**，但可以更精确一些：

| | SSR（服务端渲染） | CSR（客户端渲染） |
|---|---|---|
| HTML 生成位置 | 服务端 | 客户端（浏览器） |
| 用户首次请求收到的 | **已包含完整内容的 HTML** | **几乎空白的 HTML + JS 文件引用** |
| 页面可见时机 | HTML 到达即可见 | 需等 JS 下载、执行、渲染后才可见 |
| 典型框架 | Nuxt.js (Vue)、Next.js (React) | 纯 Vue SPA、纯 React SPA |

需要补充一点：核心区别不仅是"HTML 在哪里生成"，更重要的是**用户首次请求时，服务器返回的 HTML 是否已经包含了页面的实际内容**。SSR 返回的是"有肉"的 HTML，CSR 返回的是"空壳" HTML，靠浏览器下载 JS 后再填充内容。

---

## 二、当前项目采用的是 CSR（客户端渲染）

这个项目是一个**典型的 CSR 单页应用 (SPA)**。以下是具体证据：

### 证据 1：`index.html` — 空壳 HTML

```1:32:index.html
<!DOCTYPE html>
<html lang="">
  <head>
    <!-- ... meta tags ... -->
  </head>
  <body>
    <div id="xxapp-wm"></div>
    <noscript>
      <strong>... doesn't work properly without JavaScript enabled ...</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

`<div id="app"></div>` 是一个**空容器**。服务器返回的 HTML 里没有任何业务内容，全靠浏览器加载 `/src/main.ts` 后，由 JavaScript 动态填充。这就是 CSR 最典型的特征。

### 证据 2：`main.ts` — 客户端挂载

```233:298:src/main.ts
  app = createApp(App)
  app.use(router)
  // ... 各种插件注册 ...
  app.mount(container)
```

`createApp(App).mount('#app')` 是 Vue 3 纯客户端渲染的标准写法。整个应用的 DOM 树完全由浏览器中的 JavaScript 构建。

### 证据 3：`vite.config.ts` — 无 SSR 配置

```25:28:vite.config.ts
    plugins: [
      vue(),
      basicSsl(),
      qiankun({ name: appName }),
```

Vite 配置中没有任何 SSR 相关配置（如 `ssr: true`、`@vitejs/plugin-vue` 的 SSR 模式、或者 Nuxt 框架）。构建命令也只是简单的 `vite build`，没有 SSR 构建步骤。

### 证据 4：微前端架构（qiankun）

项目使用了 `vite-plugin-qiankun-lite`，这意味着它运行在 qiankun 微前端体系中，作为**子应用**被主应用加载。这种微前端架构本身就是基于 CSR 的。

---

## 三、"哪里在控制"渲染架构

渲染架构的决定不是由某一行代码控制的，而是由**整体技术选型**决定的。具体来说：

| 控制点 | 当前项目的选择 | 如果是 SSR 会怎样 |
|---|---|---|
| **构建工具** | Vite（纯客户端模式） | Vite SSR 模式 / Nuxt |
| **入口文件** | 只有 `main.ts`（客户端入口） | 会有 `entry-client.ts` + `entry-server.ts` |
| **HTML 模板** | 空壳 `index.html` | 服务端动态生成带内容的 HTML |
| **服务器** | 纯静态文件服务（Nginx 等） | 需要 Node.js 服务器实时渲染 |
| **Vue API** | `createApp()` | SSR 会用 `createSSRApp()` |

简单来说：**从你选择"纯 Vite + Vue 3 SPA"这个技术栈的那一刻起，就决定了这是 CSR 架构**。如果要切换到 SSR，需要引入 Nuxt 框架或手动配置 Vite 的 SSR 模式，这是一个架构级别的变更，而不是改一个配置项就能完成的事情。

