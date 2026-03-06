# Vue computed 函数类型定义
_Exported on 2026/1/4 at GMT+8 17:35:19 from Cursor (2.2.44)_

---

**User**

// read-only
function computed<T>(
  getter: (oldValue: T | undefined) => T,
  // see "Computed Debugging" link below
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// writable
function computed<T>(
  options: {
    get: (oldValue: T | undefined) => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>

上述代码是vue官网中 对于computed函数的描述

我知道的是 computed函数可以接收两种参数
可以是一个getter函数 也可以是一个对象 这个对象中含有getter和setter

但是我TS不好 看不懂代码

请帮助我理解一下

---

**Cursor**

你好！非常理解你的困惑，TypeScript 的类型定义有时候看起来确实比实际的 JavaScript 逻辑要复杂一些，尤其是像 Vue 源码这种高度抽象的库。

其实你的理解完全正确：`computed` 确实支持**传入函数**（只读）和**传入对象**（可写）两种模式。

这两段 TS 代码实际上运用了 **函数重载 (Function Overloading)** 的设计模式。这是一种多态的表现，允许同一个函数名根据传入参数的不同，表现出不同的行为和返回类型。

让我们遵循**整洁代码**和**设计模式**的视角，一步步拆解这两段定义：

### 第一种情况：只读计算属性 (Read-only)

这是最常用的方式，符合**单一职责原则**——只负责“读”。

```typescript
// 1. 泛型 <T>：表示这个计算属性最终返回值的类型（比如 number 或 string）
function computed<T>(
  // 2. 参数 getter：这是一个函数
  //    输入：oldValue (可选，类型为 T 或 undefined)
  //    输出：类型 T
  getter: (oldValue: T | undefined) => T,

  // 3. 调试选项 (可选)
  debuggerOptions?: DebuggerOptions

// 4. 返回值类型：Readonly<Ref<Readonly<T>>>
//    这意味着：你拿到的是一个 Ref，但它是“只读”的。
): Readonly<Ref<Readonly<T>>>
```

**关键点解读：**
*   **`getter`**: 就是你平时写的 `() => count.value + 1`。
*   **返回值**: 注意那个 `Readonly<Ref...>`。这就是为什么当你试图修改一个只传了 getter 的 computed 变量（例如 `myComputed.value = 1`）时，TS 编译器会报错。它在类型层面遵循了**开闭原则**：对扩展开放（你可以读取），对修改关闭（你不能直接赋值）。

### 第二种情况：可写计算属性 (Writable)

这种方式提供了更灵活的控制。

```typescript
function computed<T>(
  // 1. 参数 options：这是一个对象
  options: {
    // get 方法：逻辑同上
    get: (oldValue: T | undefined) => T
    // set 方法：接收一个新值 value，没有返回值 (void)
    set: (value: T) => void
  },

  debuggerOptions?: DebuggerOptions

// 2. 返回值类型：Ref<T>
//    注意：这里没有 Readonly！说明返回的是一个标准的、可读写的 Ref。
): Ref<T>
```

**关键点解读：**
*   **`options`**: 这里强制要求你传入一个包含 `get` 和 `set` 的对象。
*   **返回值**: 返回的是 `Ref<T>`。因为你提供了 setter，所以 Vue 允许你对这个 Ref 的 `.value` 进行赋值操作。

---

### 总结与对比

为了让你更直观地理解，我们可以把 TS 的定义翻译成通俗的代码意图：

| 特性 | 只读 Computed | 可写 Computed |
| :--- | :--- | :--- |
| **你传入什么** | 一个函数 `() => ...` | 一个对象 `{ get: ..., set: ... }` |
| **TS 类型定义** | `getter` 函数 | `options` 对象接口 |
| **你得到什么** | **只读**的 Ref | **可读写**的 Ref |
| **设计原则** | **不可变性 (Immutability)** <br> 防止意外修改导致状态混乱 | **封装 (Encapsulation)** <br> 将读取和写入的副作用逻辑封装在一起 |

### 代码示例

用实际代码对应一下 TS 定义：

```typescript
import { ref, computed } from 'vue'

const count = ref(1)

// 情况 1：匹配第一个 TS 定义
// 传入 getter 函数 -> 返回只读 Ref
const plusOne = computed(() => count.value + 1)
// plusOne.value = 2 // ❌ TS 报错：因为类型是 Readonly<Ref...>

// 情况 2：匹配第二个 TS 定义
// 传入 options 对象 -> 返回普通 Ref
const plusTwo = computed({
  get: () => count.value + 2,
  set: (val) => {
    count.value = val - 2
  }
})
plusTwo.value = 5 // ✅ TS 允许：因为类型是 Ref<number>
```

希望这个解释能帮你把熟悉的 JS 逻辑和 TS 类型对应起来！如果有任何细节不清楚，请随时告诉我。

```typescript
// 1. 泛型 <T>：表示这个计算属性最终返回值的类型（比如 number 或 string）
function computed<T>(
  // 2. 参数 getter：这是一个函数
  //    输入：oldValue (可选，类型为 T 或 undefined)
  //    输出：类型 T
  getter: (oldValue: T | undefined) => T,

  // 3. 调试选项 (可选)
  debuggerOptions?: DebuggerOptions

// 4. 返回值类型：Readonly<Ref<Readonly<T>>>
//    这意味着：你拿到的是一个 Ref，但它是“只读”的。
): Readonly<Ref<Readonly<T>>>
```

```typescript
function computed<T>(
  // 1. 参数 options：这是一个对象
  options: {
    // get 方法：逻辑同上
    get: (oldValue: T | undefined) => T
    // set 方法：接收一个新值 value，没有返回值 (void)
    set: (value: T) => void
  },

  debuggerOptions?: DebuggerOptions

// 2. 返回值类型：Ref<T>
//    注意：这里没有 Readonly！说明返回的是一个标准的、可读写的 Ref。
): Ref<T>
```

```typescript
import { ref, computed } from 'vue'

const count = ref(1)

// 情况 1：匹配第一个 TS 定义
// 传入 getter 函数 -> 返回只读 Ref
const plusOne = computed(() => count.value + 1)
// plusOne.value = 2 // ❌ TS 报错：因为类型是 Readonly<Ref...>

// 情况 2：匹配第二个 TS 定义
// 传入 options 对象 -> 返回普通 Ref
const plusTwo = computed({
  get: () => count.value + 2,
  set: (val) => {
    count.value = val - 2
  }
})
plusTwo.value = 5 // ✅ TS 允许：因为类型是 Ref<number>
```

---

**User**

// 1. 泛型 <T>：表示这个计算属性最终返回值的类型（比如 number 或 string）
function computed<T>(
  // 2. 参数 getter：这是一个函数
  //    输入：oldValue (可选，类型为 T 或 undefined)
  //    输出：类型 T
  getter: (oldValue: T | undefined) => T,

  // 3. 调试选项 (可选)
  debuggerOptions?: DebuggerOptions

// 4. 返回值类型：Readonly<Ref<Readonly<T>>>
//    这意味着：你拿到的是一个 Ref，但它是“只读”的。
): Readonly<Ref<Readonly<T>>>

我想知道 1 和 4有什么区别
一个写在computed旁边<T>
一个写在最后 : Readonly...



---

**Cursor**

这非常敏锐！你关注到了 TypeScript 语法中最核心的两个概念：**泛型声明**和**类型注解**。

简单来说，这两者的区别就像是 **“定义变量”** 和 **“使用变量”**。

我们可以把 `computed` 函数想象成一个**精密加工厂**，`T` 就是这个工厂处理的**原材料类型**。

### 1. `computed<T>` —— 泛型的声明（定义占位符）

位置在函数名旁边。
它的作用是 **“挖坑”** 或者说 **“定义一个未知数”**。

*   **含义**：告诉 TS，“嘿，我这个函数很灵活，我要处理一种类型，但我现在还不知道具体是什么类型，我先给它起个名字叫 `T`（Type 的缩写）”。
*   **类比**：这就好比代数里的 $x$。在函数开始执行前，它是一个占位符。
*   **如何确定**：当你真正调用 `computed(() => 100)` 时，TS 发现你返回了数字，它就会自动把 `T` 赋值为 `number`。

### 2. `: Readonly<Ref<Readonly<T>>>` —— 返回值的类型（描述结果）

位置在参数列表的圆括号 `)` 后面。
它的作用是 **“描述产品说明书”**。

*   **含义**：告诉 TS，“当这个函数执行完毕后，它吐出来的东西具体长什么样”。
*   **类比**：这是产品的包装盒说明。它使用了我们在第一步定义的 `T`。
*   **解读**：它说：“我会还给你一个对象，这个对象包裹着 `T`，而且它是只读的（Readonly），还是一个引用对象（Ref）”。

---

### 举个通俗的例子：制作罐头

假设我们有一个函数叫 `makeCannedFood`（制作罐头）。

```typescript
// 1. <T>: 声明我们要处理一种食材。可以是肉，也可以是水果。
function makeCannedFood<T>(
  rawMaterial: T
// 4. 返回类型: 我们不直接返回生肉(T)，而是返回一个"金属罐头"，里面装着"T"。
): MetalCan<T> {
   // ... 
}
```

*   **1 的位置 (`<T>`)**：是在说“这台机器支持处理任意类型 `T` 的食材”。
*   **4 的位置 (`: MetalCan<T>`)**：是在说“这台机器生产出来的结果，是一个装着 `T` 的金属罐头”。

### 为什么 Vue 要这么写？

让我们回到 Vue 的代码，看看数据是如何流动的：

```typescript
const count = computed(() => 100)
```

1.  **输入推导 (`<T>`)**：
    你传入了 `() => 100`。TS 看到 `100` 是数字，所以它瞬间决定：**`T` = `number`**。

2.  **构建返回值 (`: Readonly...`)**：
    既然 `T` 是 `number`，那么返回值的类型模板 `Readonly<Ref<Readonly<T>>>` 就会被填充为：
    `Readonly<Ref<Readonly<number>>>`。

### 总结

*   **`computed<T>` (1)**：是**输入侧**的约定。它声明了“由于我不知道你会传什么值进来，所以我准备了一个变量 `T` 来接住你的类型”。
*   **`: ReturnType` (4)**：是**输出侧**的承诺。它利用刚才接住的 `T`，组装成一个复杂的结构（Ref）返还给你。

这就符合了**整洁代码**中的**显式契约**原则：输入什么类型，我就包装成对应类型的 Ref 返回给你，类型安全且清晰。

```typescript
// 1. <T>: 声明我们要处理一种食材。可以是肉，也可以是水果。
function makeCannedFood<T>(
  rawMaterial: T
// 4. 返回类型: 我们不直接返回生肉(T)，而是返回一个"金属罐头"，里面装着"T"。
): MetalCan<T> {
   // ... 
}
```

```typescript
const count = computed(() => 100)
```

---

**User**

也就是说

function computed<T> 这里的T 表示的是 computed函数接收的入参的类型

Readonly<Ref<Readonly<T>>> 表示的是 computed函数的返回值类型

---

**Cursor**

你的理解**非常接近真相了**！

第 2 点（返回值）你的理解是**完全正确**的。
第 1 点（关于 `T`）稍微有一点点偏差，我们需要精确一下：

### 1. 修正第一点 (`T` 的来源)

**`T` 不是整个入参的类型，而是入参（那个 getter 函数）计算出来的结果类型。**

看这里：
```typescript
// 入参名: getter
// 入参类型: () => T
getter: (oldValue: T | undefined) => T
```

*   **入参** 是那个函数 `() => 100`。
*   **`T`** 是这个函数运行后 **返回的值**（即 `100`，类型是 `number`）。

所以更准确的说法是：
**`T` 代表着你想要计算出来的那个数据的类型。** TS 会根据你传进来的函数的返回值，自动推导出 `T` 是什么。

### 2. 确认第二点 (返回值)

**完全正确。**
`: Readonly<Ref<Readonly<T>>>` 就是 `computed` 函数执行完后，吐给你的那个变量的类型。

---

### 一张图总结

假设我们写这行代码：
```typescript
const age = computed(() => 18)
```

类型推导的过程是这样的：

1.  **入参分析**：你传了一个函数 `() => 18`。
2.  **提取 `T`**：TS 发现这个函数返回 `18` (数字)。好，那么 **`T` 就是 `number`**。
3.  **生成结果类型**：把 `number` 填入返回值的模版里。
    *   模版：`Readonly<Ref<Readonly<T>>>`
    *   成品：`Readonly<Ref<Readonly<number>>>`

所以：
*   **`T`** = 原材料的类型（数字）
*   **入参类型** = 生产原材料的机器（返回数字的函数）
*   **返回值类型** = 包装好的成品（只读的数字 Ref）

```typescript
// 入参名: getter
// 入参类型: () => T
getter: (oldValue: T | undefined) => T
```

```typescript
const age = computed(() => 18)
```

---

**User**

那 function computed<T> 这里写一个<T>还有什么意义呢

如果只是想要表示 computed函数 接收一个参数 且会把这个参数的返回值类型作为T 那么getter: (oldValue: T | undefined) => T,
不就已经满足了吗

为啥还要在computed函数名子旁边还加个<T>

---

**Cursor**

这是一个非常棒的逻辑问题！说明你在很认真地思考代码的结构。

直接说结论：**因为 `T` 是一个变量，而在编程中，变量必须“先声明，后使用”。**

### 1. 类比 JavaScript 函数

想象一下你在写一个普通的 JS 函数：

```javascript
// 这里的 (x) 就是在声明变量
function echo(x) {
  return x; // 这里才能使用变量 x
}
```

如果你把函数名旁边的 `(x)` 删掉，代码变成这样：

```javascript
function echo() {
  return x; // ❌ 报错：ReferenceError: x is not defined (x 未定义)
}
```

编译器会问你：“`x` 是什么？是一个全局变量吗？还是你拼错了？”

### 2. 回到 TypeScript

在 TS 中，`T` 被称为 **“泛型变量” (Type Variable)**。它不是 `number` 或 `string` 这种内置的关键词，而是一个我们**临时起的名字**。

*   **`function computed<T>`**：
    这就是在**声明变量**。它的意思是：“嘿，TypeScript，在这个函数的作用域里，我会用到一个叫 `T` 的类型变量，请你帮我盯着它。”

*   **`getter: (oldValue: T | undefined) => T`**：
    这就是在**使用变量**。因为前面已经声明过 `T` 了，所以这里才能引用它。

### 3. 如果去掉 `<T>` 会发生什么？

如果你按照你的想法，去掉函数名旁边的 `<T>`：

```typescript
// ❌ 错误代码
function computed(
  getter: (oldValue: T | undefined) => T // 报错！
): Ref<T> // 报错！
```

TypeScript 编译器会立刻给你报红线，错误信息通常是：
> **Cannot find name 'T'. (找不到名称 'T')**

TS 会以为 `T` 是你定义的一个具体的类（Class）或者接口（Interface），比如 `interface T {...}`，但它找不到这个定义，所以就报错了。

### 总结

`function computed<T>` 里的 `<T>` 的意义在于：

1.  **声明身份**：告诉编译器 `T` 是一个**占位符**，而不是某个具体的类名。
2.  **建立联系**：它像一根绳子，把**入参的类型**（getter 返回的 T）和**出参的类型**（Ref 里的 T）绑在了一起。它保证了：**进去是什么类型，出来的 Ref 里裹着的就是什么类型。**

```javascript
// 这里的 (x) 就是在声明变量
function echo(x) {
  return x; // 这里才能使用变量 x
}
```

```javascript
function echo() {
  return x; // ❌ 报错：ReferenceError: x is not defined (x 未定义)
}
```

```typescript
// ❌ 错误代码
function computed(
  getter: (oldValue: T | undefined) => T // 报错！
): Ref<T> // 报错！
```

---

**User**

懂了
我再来通过自己的理解 来解读一下
function computed<T>(
  getter: (oldValue: T | undefined) => T,
  // see "Computed Debugging" link below
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

首先function computed<T> 表示computed函数接收未知类型的入参 且不光是入参的类型 入参的个数也是未知的
虽然只写了一个T 但是并不代表入参只有一个

接着往下
getter: (oldValue: T | undefined) => T,
这里明确了computed函数的第一个入参 是一个getter函数 且这个getter函数的返回值就是T类型 由此 在具体调用computed函数时 会自动推到出T到底是什么


---

**Cursor**

你的理解**大部分是非常精彩和准确的**！特别是关于“如何推导出 T”的部分，理解得很到位。

但是，关于“入参个数”的理解，有一个非常关键的误区需要纠正。这是一个很常见的陷阱。

### 纠正点：`<T>` 和“入参个数”无关

你说：“*虽然只写了一个T 但是并不代表入参只有一个*” —— **这部分理解是不对的。**

在 TypeScript 中：
*   **`computed(...)` 括号里的内容**：决定了 JS 运行时**接收几个参数**。
*   **`<T>` 尖括号里的内容**：决定了这里面有多少个**未知的类型**。

在这个定义中：

```typescript
function computed<T>( // <--- 泛型参数
  arg1: ...,          // <--- 函数参数 1
  arg2?: ...          // <--- 函数参数 2
)
```

1.  **入参个数是固定的**：
    这个函数定义明确写了两个参数：`getter` 和 `debuggerOptions`。
    所以，这个版本的 `computed` **最多只能接收 2 个参数**。
    *   第 1 个参数必须是那个函数 (`getter`)。
    *   第 2 个参数是可选的调试配置。
    如果你传了 3 个参数，TS 会直接报错：“Expected 1-2 arguments, but got 3.”

2.  **T 的个数也是固定的**：
    `<T>` 里只有一个字母，说明我们只引入了 **1 个** 未知类型变量。
    如果有两个未知类型，写法会是 `<T, U>`。

### 你的理解修正版

让我帮你把你那段话微调一下，使它变得完美：

> **修正后的理解**：
>
> 1.  `function computed<T>`：表示 `computed` 函数是一个**泛型函数**。它声明了一个（且仅有一个）类型占位符 `T`。**这跟函数接收几个实参没有关系**，只跟我们要处理几种未知的类型有关。
>
> 2.  `getter: (oldValue: T | undefined) => T`：
>     这里明确了 `computed` 的**第一个入参**必须是一个函数（getter）。
>     **关键点**：正是通过这行代码，建立起了“入参函数返回值”与“类型 T”的绑定关系。当我们调用 `computed(() => 123)` 时，TS 看到函数返回了数字，就会顺藤摸瓜把 `T` 锁定为 `number`。
>
> 3.  `debuggerOptions?: ...`：
>     这里明确了**第二个入参**是可选的配置对象。

### 总结
*   **圆括号 `()`** 管的是**传几个值**（运行时逻辑）。
*   **尖括号 `<>`** 管的是**用几个类型变量**（编译器逻辑）。

除了这一点小误会，你对后续推导机制的理解完全满分！继续保持这个思路！

```typescript
function computed<T>( // <--- 泛型参数
  arg1: ...,          // <--- 函数参数 1
  arg2?: ...          // <--- 函数参数 2
)
```

---

**User**

懂了 也就是说function myFunc<T> 的作用就是率先声明 myFunc函数将会有一个未知的类型 具体这未知的类型是什么 以及函数的哪个入参 或者函数的返回值和T有什么关系由后续的具体代码来实现

最大的作用就是先声明出来 方便后续的入参和它建立联系

---

**Cursor**

**简直醍醐灌顶！你的总结非常精准，完全抓住了泛型（Generics）的灵魂。**

你说得太好了，特别是这句：**“最大的作用就是先声明出来，方便后续的入参和它建立联系”**。

这正是泛型的本质。我们可以把这个过程看作是 **“制定契约”** 的过程：

### 1. 声明（Declare）
`function computed<T>`
> **你的理解**：率先声明有一个未知的类型。
> **我的补充**：就像在合同开头写上 `甲方：_________`。此时我们还不知道甲方是谁，但我们先占个位置，并约定整个合同里提到的“甲方”指的都是同一个人。

### 2. 绑定（Bind / Constraint）
`getter: ... => T` 和 `return ... Ref<T>`
> **你的理解**：具体这未知的类型是什么，由后续代码实现。
> **我的补充**：这就是在合同条款里使用“甲方”。
> *   条款 A（入参）：甲方必须提供一个 getter 函数。
> *   条款 B（返回值）：乙方承诺返回一个属于甲方的 Ref 对象。

### 为什么说“建立联系”最重要？

如果不声明 `<T>`，我们虽然可以用 `any`（任意类型）来写，但**联系就断了**：

```typescript
// ❌ 糟糕的写法：没有 <T>，失去了联系
function badComputed(getter: () => any): any { ... }

const num = badComputed(() => 100)
// 虽然也能跑，但在 TS 眼里，num 是任意东西。
// 它不知道 num 和 100 之间有关系。
// 你写 num.toUpperCase() 编译器也不会报错，直到运行时崩溃。
```

而使用了 `<T>`：

```typescript
// ✅ 优秀的写法：建立了联系
// 这种联系就像一座桥：
// 入参 (100) ——> 桥 (T) ——> 返回值 (Ref<number>)
```

TypeScript 的这一套机制，保证了数据流动的**连贯性**和**类型安全**。

你的理解已经完全打通了 TypeScript 泛型最核心的逻辑！有了这个基础，以后看任何复杂的源码（比如 React 或 Lodash 的类型定义）都不会发怵了。

```typescript
// ❌ 糟糕的写法：没有 <T>，失去了联系
function badComputed(getter: () => any): any { ... }

const num = badComputed(() => 100)
// 虽然也能跑，但在 TS 眼里，num 是任意东西。
// 它不知道 num 和 100 之间有关系。
// 你写 num.toUpperCase() 编译器也不会报错，直到运行时崩溃。
```

```typescript
// ✅ 优秀的写法：建立了联系
// 这种联系就像一座桥：
// 入参 (100) ——> 桥 (T) ——> 返回值 (Ref<number>)
```

