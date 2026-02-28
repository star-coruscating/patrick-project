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
**1. let const**

首先作用域的概念 由全局作用域 函数作用域（其实还有一个eval作用域 但是由于可维护性很差 不推荐使用 不去了解） 扩充了一个块级作用域

【全局作用域】存在一个知识点 如果没有声明一个变量 而是直接给变量赋值 在非严格模式下 该变量会自动变成全局变量

【块级作用域】概念的完整表述: 
针对于通过let或者const关键字声明的变量来说 由一对大括号{}包裹的作用域就叫块级作用域 
    比如if, for...    ==>Chapter 作用域和作用域链

【变量提升】概念的完整表述: 
  通过var关键字定义的变量 会将变量的声明 提升至当前作用域的最顶端
  注意 函数的声明也会被提升至当前作用域顶端 并且如果函数声明和变量声明同名 那么函数声明的优先级更高

```javascript
;(function () {
  console.log(typeof foo)
  console.log(typeof bar)
  var foo = 'HELLO'
  var bar = function () {
    return 'world'
  }

  function foo() {
    return 'good'
  }

  console.log(foo, typeof foo)
})()

//output:
//function
//undefined
//HELLO string
```


**2. 数组**

1. for...of ==> 迭代器
2. 数组的flat()
3. new Array(10).fill(1).map(...)

**3. 对象**

1. 扩展运算符 spread
2. 解构 destructuring
   平常用的较多的
   ```javascript
   const { a, b, c } = obj; // const a = obj.a; const b = obj.b; const c = obj.c
   ```
   上面这种其实是一种简写 需要能够知道完整版怎么写
   ```javascript
   const { prop1: x, prop2: y, prop3: z } = obj;  // const x = obj.prop1; const y = obj.prop2; const z = obj.prop3
   ```
3. 属性描述符 property descriptor ==> vue原理中会用到 Object.defineProperty
4. 方法的速写
   ```javascript
   const obj = {
    sum: function(a, b) {
      return a+b;
    },
    random: function(min, max) {
     //...
    }
   }
   ```

   速写:
   
   ```javascript
   const obj = {
     sum(a, b) {
       return a+b
     },
     random(min, max) {
       //...
     }
   }
   ```
5. Set Map
  Map和对象都是键值对 区别是什么？
# Map 和对象的区别
_Exported on 2026/2/28 at GMT+8 14:34:37 from Cursor (2.4.27)_

---

**User**

Map 和 对象 都是键值对 区别是什么?

---

**Cursor**

## Map 与 Object 的区别

两者虽然都是键值对结构，但在多个维度上存在本质差异：

### 1. 键的类型

| 特性 | Object | Map |
|---|---|---|
| 键类型 | 只能是 `string` 或 `Symbol` | **任意类型**（对象、函数、数字等） |

```javascript
const map = new Map()
const objKey = { id: 1 }
map.set(objKey, 'value')    // 对象作为键
map.set(42, 'number key')   // 数字作为键

const obj = {}
obj[objKey] = 'value'       // 被转为 "[object Object]" 字符串
obj[42] = 'number key'      // 被转为 "42" 字符串
```

### 2. 键的顺序

- **Object**：键的顺序不完全可靠（整数键会被排序，其他键按插入顺序）
- **Map**：严格按照**插入顺序**迭代，保证有序

### 3. 大小获取

```javascript
const map = new Map([['a', 1], ['b', 2]])
map.size  // 2，直接获取 O(1)

const obj = { a: 1, b: 2 }
Object.keys(obj).length  // 2，需要遍历计算
```

### 4. 迭代方式

```javascript
// Map 原生可迭代
for (const [key, value] of map) { }
map.forEach((value, key) => { })

// Object 需要借助静态方法
for (const key of Object.keys(obj)) { }
Object.entries(obj).forEach(([key, value]) => { })
```

### 5. 性能差异

| 场景 | Object | Map |
|---|---|---|
| 频繁增删键值对 | 较慢 | **更快**（专门优化过） |
| 大量数据存储 | 内存占用较大 | **内存效率更高** |
| 属性查找 | 会沿原型链查找 | 只查自身，无原型链干扰 |

### 6. 原型链污染

```javascript
const obj = {}
obj.toString         // [Function: toString]，继承自原型
'toString' in obj    // true，存在原型链污染风险

const map = new Map()
map.get('toString')  // undefined，干净无副作用
```

### 7. 序列化支持

```javascript
JSON.stringify({ a: 1 })       // '{"a":1}'，原生支持
JSON.stringify(new Map([['a', 1]]))  // '{}'，不支持，需手动转换

// Map 序列化需要额外处理
JSON.stringify([...map.entries()])
```

### 何时选择 Map

- 键不是字符串（如用对象、DOM 元素做键）
- 需要频繁增删键值对
- 需要保证严格的插入顺序
- 需要直接获取 `.size`
- 需要避免原型链干扰

### 何时选择 Object

- 键是固定的字符串，结构明确（如配置项、DTO）
- 需要 JSON 序列化/反序列化
- 需要解构赋值 `const { a, b } = obj`
- 作为函数参数传递记录型数据

简单来说：**Object 适合表示"记录/实体"，Map 适合表示"字典/映射表"**。


也是正因为 Map具有 键的顺序严格按照插入的顺序 这一特性 可以用Map这个数据结构来实现 LRU缓存
JS的Map 具有一个重要的特性 能够记住顺序
相较于其他编程语言，这一特性属于天生的巨大优势，因为其他的语言为了维护顺序，通常需要使用双向链表(doubly linked list)
该重大特性的一个具体落地 就是使用JS实现LRU缓存，其他的编程语言，为了实现LRU，一般需要组合数据结构（hashmap/dictionary + doubly linked list）
而JS实现LRU缓存 进需要使用Map就可以

```typescript
export class LRUCache<T> {
  private capacity: number;
  private cache: Map<string, T>;

  constructor (capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get (key: string): T | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  put (key: string, value: T): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey!);
    }
    this.cache.set(key, value);
  }

  size (): number {
    return this.cache.size;
  }

  clear (): void {
    this.cache.clear();
  }
}


```






**4. 函数**
1. 箭头函数
   1.不能使用new调
   2.没有原型 prototype为undefined
   3.没有arguments
   4.没有this  （this是用的外部的this）
2. 剩余参数（rest parameters）: ...args  注意args本身就是一个数组 可以用数组的一切方法
3. 参数默认值
4. Class

