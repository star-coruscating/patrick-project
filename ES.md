ES6+

ES和JS的关系：
ES（ECMA Script）由标准库和语言规范组成
JS = ES + WebAPI（BOM+DOM）

**1. ECMAScript (ES)**

ES 是由 ECMA International 通过 **ECMA-262** 标准定义的**语言规范**。它包含：

- **语言核心语法**：变量声明、控制流、函数、类、模块等
- **内置对象/标准库**：`Array`、`Object`、`Promise`、`Map`、`Set`、`Proxy` 等

所以你说"标准库 + 语言规范"是合理的，但更准确地说，标准库本身也是规范的一部分，即 **ES = 语言规范（包含核心语法 + 内置标准对象）**。

**2. JavaScript (JS)**

JS = ES + **宿主环境提供的 API**。这里需要注意，宿主环境不仅仅是浏览器：

| 运行环境 | 组成 |
|---|---|
| 浏览器 | JS = ECMAScript + **Web API**（DOM、BOM、Fetch、Canvas、WebSocket 等） |
| Node.js | JS = ECMAScript + **Node API**（fs、http、path、child_process 等） |
| Deno / Bun | JS = ECMAScript + 各自的运行时 API |

**3. 总结**

你说"JS = ES + WebAPI"在**浏览器环境**下是准确的。但更通用的表述是：

> **JavaScript = ECMAScript（语言核心） + 宿主环境 API**

ECMAScript 定义了语言本身"能做什么"，宿主环境决定了语言"能操作什么"（比如操作 DOM 还是读写文件）。两者的关系类似于"引擎"和"车身"——ES 是引擎，宿主环境提供了车身和方向盘。

ES6 几乎重塑了 JavaScript 的编码方式：

- `let` / `const` — 块级作用域，告别 `var` 的陷阱
- 箭头函数 `=>` — 简洁语法 + 词法 `this`
- `class` — 面向对象语法糖
- 模块化 `import` / `export` — 原生模块系统
- `Promise` — 异步编程基石
- 解构赋值、模板字符串、默认参数、剩余/展开运算符
- `Symbol`、`Iterator`、`Generator`
- `Map` / `Set` / `WeakMap` / `WeakSet`
- `Proxy` / `Reflect` — 元编程能力（Vue 3 响应式的基础）
- `for...of` 循环


-----------------------------------------------------------------
1. let const
首先作用域的概念 由全局作用域 函数作用域（其实还有一个eval作用域 但是由于可维护性很差 不推荐使用 不去了解） 扩充了一个块级作用域
【全局作用域】存在一个知识点 如果没有声明一个变量 而是直接给变量赋值 在非严格模式下 该变量会自动变成全局变量
【块级作用域】概念的完整表述: 
针对于通过let或者const关键字声明的变量来说 由一对大括号{}包裹的作用域就叫块级作用域 
    比如if, for...    ==>Chapter 作用域和作用域链

【变量提升】概念的完整表述: 
  通过var关键字定义的变量 会将变量的声明 提升至当前作用域的最顶端
  注意 函数的声明也会被提升至当前作用域顶端 并且如果函数声明和变量声明同名 那么函数声明的优先级更高
