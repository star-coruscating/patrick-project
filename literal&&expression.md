字面量 VS 表达式
这个概念看上去简单 但是它会在很隐晦的地方用到 那时候 就容易出错

1.
所谓字面量 就是在代码里直接写出来（声明）的值本身
比如 数字 17 字符串 "abc1996" 布尔 true 其他的比如 null {name: 'Patrick'} 等等
这些就叫做 字面量 直接写出来 无需经过计算 

2.
与之对应的一个概念就叫做 表达式
所谓表达式 是指能够得出值的代码片段
经过一段代码 能够获取到（计算出）一个值 那么这个代码片段就是一个表达式
比如写代码时最熟悉的三元运算表达式 计算（12+3）赋值 对象的成员访问 变量
其实字面量也是一种表达式 最简单直接的表达式


写到这 其实我们都本能的能够分得清字面量和表达式
下面着重说的是 什么时候容易弄混


访问对象成员时 有两种语法
1.点语法  obj.a  arr.length
2.中括号语法 obj[foo]

两者的关系是
obj.a === obj["a"]

点语法 点后面必须要跟一个字面量
中括号语法 中括号中必须是一个表达式

其实最终编译时 都是使用的中括号语法 点语法是一种语法糖
最终编译中 如果是点语法 先转换成中括号语法 然后计算中括号中表达式的值 然后转换成键名



举例
const RAW = Symbol("raw")
this[RAW]
this.RAW

上述两种写法是否有区别？
==>
有！
this[RAW] 中括号语法 中括号中是表达式 此时RAW就是上面定义的const常量
this.RAW === this["RAW"] 这里访问的是this中的名叫RAW的属性


好的，你的问题涉及 Symbol 的两种用法，我来逐层拆解。

---

## 一、`Symbol()` 和 `Symbol("raw")` —— 创建自定义 Symbol

你说得对，Symbol 的核心特性是**全局唯一**。每次调用 `Symbol()` 都会产生一个独一无二的值：

```javascript
const a = Symbol()
const b = Symbol()
console.log(a === b) // false，永远不相等
```

`Symbol("raw")` 中的 `"raw"` 只是一个**描述标签（description）**，方便调试时阅读，不影响唯一性：

```javascript
const s1 = Symbol("raw")
const s2 = Symbol("raw")
console.log(s1 === s2)    // false，描述相同但仍然是两个不同的 Symbol
console.log(s1.toString()) // "Symbol(raw)"，调试时能看到含义
```

这类 Symbol 的典型用途是**作为对象的属性键**，避免属性名冲突：

```javascript
const ID = Symbol("id")
const obj = {
  [ID]: 123,
  name: "test"
}
// 不会和任何字符串属性冲突，也不会被 for...in 枚举到
```

---

## 二、`Symbol.iterator` —— 内置的"知名 Symbol"

`Symbol.iterator` 和你自己写 `Symbol("xxx")` **不是一回事**。

它是 JS 引擎**预先创建好的、全局共享的**一个 Symbol，属于 ES6 定义的 13 个"知名 Symbol（Well-Known Symbols）"之一。

关键区别：

| | `Symbol("raw")` | `Symbol.iterator` |
|---|---|---|
| 谁创建的 | 你自己 | JS 引擎预置 |
| 唯一性来源 | 每次调用都是新的 | 全局只有一个，所有代码共享 |
| 用途 | 自定义的属性键 | **语言层面的协议约定** |

你可以把 `Symbol.iterator` 理解为一个**"JS 引擎和你的代码之间的约定暗号"**：

> 当 `for...of` 要遍历一个对象时，引擎会去找这个对象上有没有 `[Symbol.iterator]` 方法。有就调用它拿到迭代器，没有就报错 "is not iterable"。

之所以用 Symbol 而不是普通字符串 `"iterator"`，就是为了**不和你代码中可能存在的同名属性冲突**。

---

## 三、用一个类比串起来

把 Symbol 想象成"钥匙"：

- `Symbol("raw")` —— 你自己配了一把钥匙，上面刻了 "raw" 方便你认，但每次配都是不同的钥匙
- `Symbol.iterator` —— JS 出厂时就造好的一把"万能协议钥匙"，全世界只有这一把。引擎用这把钥匙去开你对象上的"迭代器锁"，能开就能 `for...of`

所以你代码中的：

```96:99:daily.js
  [Symbol.iterator]() {
    return this
  }
```

意思是：**在对象上安装那把引擎能识别的"协议钥匙"对应的锁**，让引擎知道"这个对象是可迭代的，调用这个方法就能拿到迭代器"。

---

## 四、其他常见的知名 Symbol

同样的设计思路，JS 还预置了其他知名 Symbol：

```javascript
Symbol.toPrimitive   // 控制对象转原始值的行为
Symbol.hasInstance    // 控制 instanceof 的行为
Symbol.toStringTag   // 控制 Object.prototype.toString 的输出
```

它们的共同点：都是**语言机制和用户代码之间的"钩子"**，用 Symbol 做键名避免命名污染。



