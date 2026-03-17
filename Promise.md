**单线程是异步产生的原因**

**事件循环是异步实现的方式**

Promise:
Promise规范
+
Promise API


catch方法本质上是then方法的变种  只去处理失败的情况

.then(null, onRejected) === .catch(onRejected)


**Promise的链式调用**

1. then方法 一定返回一个Promise对象（新任务）
2. 新任务的状态 取决于
   1. **如果没有相关的后续处理 那么新任务状态和旧任务状态一致 数据也是旧任务的数据**
      比如
      原来的任务（旧任务）中检定通过的是resolve() 即状态从pending变成了fulfilled
      而在.then()中处理后续时 只针对失败的情况(onRejected)做了处理 而没有针对成功的情况(onFulfilled)做处理
      那么新任务的状态 = 旧任务的状态 = fulfilled 原来的任务 检定通过的是reject() 状态从pending 变成了 rejected在.then()中处理后续时 只针对于成功的情况(onFulfilled)做了处理 而没有针对失败的情况(onRejected)做处理
    那么 新任务的状态 = 旧任务的状态 = rejected


   2. 如果原先的任务还没有执行 还处于pending状态 （还没有进入.then()）那么新任务也是pending
   3. 存在相关的后续处理并且页执行了  那么新任务的状态依赖新任务自己的后续处理 且有三种情况
      1. 如果新任务自己的后续处理中 代码执行存在报错 那么新任务的状态就是rejected 数据是异常对象
      2. 如果新任务自己的后续处理中 代码执行没有报错 那么新任务的状态就是fulfilled 数据是后续处理的返回值
      3. 如果后续处理返回的是一个任务对象 (return new Promise()) 那么新任务的状态 和数据 与这个任务对象（new Promise）一致

注意点：
1. 如果第一个任务 既没有调用resolve 也没有调用reject 而是直接抛出一个错误 或者直接代码执行失败了 那么等效于状态变成了rejected
2. 关于定义 什么叫 有抛出错误 其关键字对应的是 throw 而不是Error ==> return new Error() 这个叫返回一个Error对象 不叫抛出错误

------------------------------------------------------------------

**Promise的静态方法**

1. Promise.resolve(1) 等价于
            new Promise(resolve => {
                resolve(1)
            })
2. Promise.reject() 类似于（1）
3. Promise.all() ==> 任务数组中 所有的任务都成功 才算成功 输出也是按照顺序输出的
4. Promise.any() ==> 任务数组中 但凡有一个成功 那么就成功了 用Promise.any可以拿到最先成功的对象和它的数据
5. Promise.allSettled() ==> 任务数组中 只要状态从unsettled 变成了 settled (无论成功还是失败) 都能拿到 可以后续通过过滤的方式 拿到成功的数据
6. Promise.race() ==> 用于拿到最先从unsettled 变成 settled的任务数据（无论成功还是失败）



-------------------------------------------------------------


Promise没有消除回调 而是通过链式调用的方式 避免了回调地狱（回调套回调）

Promise也统一了 处理异步任务的方式 ==> 因此官网给出了新的语法 async await

**async await 与 Promise的关系**
2015 (ES6)：Promise 成为 JavaScript 内置标准

2017 (ES8)：async/await 正式加入语言规范

核心关系：语法糖（Syntactic Sugar）
async/await 没有创造新的异步能力，它完全是基于 Promise 的书写方式优化。


async 用于修饰函数

**加了async修饰的函数 一定返回Promise对象**


使用async修饰的函数 如在函数执行中存在报错 那么函数的返回值 即Promise对象的状态就是rejected

await关键字 用于等待一个Promise完成 所谓完成 就是从pending变成fulfilled

如果await后面的Promise对象 状态变成了 rejected 那么就会抛出一个异常 这种情况 可以用try...catch 去处理异常

按理说 await后面需要跟一个Promise对象 如果await后面不是一个Promise对象 会自动将其转换为Promise对象

比如 await 1  相当于是 await Promise.resolve(1) 

**await相当于是替代了.then回调的语法糖**

-------------------------------------------------------------

注意点

1) 当通过new Promise(executor) 新建一个Promise对象时 **executor 不会进入事件队列排队 而是直接执行**
   <img width="1247" height="316" alt="image" src="https://github.com/user-attachments/assets/8f54b4a9-1081-443a-997d-5c0d606df28e" />

2) Promise的then 函数回调 是要**进入微任务队列**的
   <img width="830" height="247" alt="image" src="https://github.com/user-attachments/assets/7b1ea790-ee31-43bd-8c92-eba83318359a" />
3) <img width="654" height="328" alt="image" src="https://github.com/user-attachments/assets/cf17072c-f41f-4900-8afd-f3cb12574066" />
4) <img width="819" height="561" alt="image" src="https://github.com/user-attachments/assets/65e51d9a-2495-47e2-93f5-0db96b7b625d" />
  用async 修饰一个函数以后 一定会返回一个Promise

那么怎么判断这个函数Promise的状态呢

==>

函数运行结束了 那么状态就fulfilled

如在函数执行中存在报错Promise对象的状态就是rejected
5) 如果then中 没有传递函数 而是传递的其他 比如数字 比如对象等 可以直接把then删除
<img width="890" height="383" alt="image" src="https://github.com/user-attachments/assets/951b9159-e51c-4d04-8d15-ed2de5473454" />
6) **细节: 变量的定义和赋值 是分两步实现的**

var b = new Promise()  // step1. var b (b = undefinded) step2. 计算出等号右边的结果 3. 把右边的结果赋值给左边
<img width="1018" height="647" alt="image" src="https://github.com/user-attachments/assets/475aa892-d869-44fc-87de-34ba6fc0e777" />
7) <img width="962" height="594" alt="image" src="https://github.com/user-attachments/assets/0fe0a941-3b62-423f-bde9-dee99d7ffa73" />

-------------------------------------------------------------

**手写Promise**

思路整理

我们要实现的是Promise

先写出是怎么调用Promise的

```javascript
new Promise((resolve, reject)=> {
    if( xxx ) {
        resolve(...)
    } else {
        reject(...)
    }
})
```
根据调用代码

首先Promise通过new来调用 因此一定是一个构造函数 ==> 我们可以使用es6的class来写

其次这个构造函数接受一个变量 且这个变量是一个函数(executor) 而且根据之前所学知识 new Promise后 函数是立即执行的 ==> 想到class中的constructor

函数也接受两个变量 resolve 和 reject 且这两个变量都是函数 这两个函数都接受一个变量 resolve接受变量是data reject接受变量是reason

因此大体的代码框架就有了:

class MyPromise {
    constructor(executor) {
        executor(this._resolve, this._reject);
    }
    _resolve(data) {};
    _reject(reason) {};
}

其次看一下_resolve和_reject

通过resolve方法 Promise对象的状态会从pending --> fulfilled

通过reject方法 Promise对象的状态会从pending --> rejected

所以在我们的方法中 需要一个状态字段 也需要一个数据字段 来记录当前Promise对象的状态和数据

```javascript
class MyPromise {
    constructor(executor) {
        this._state = 'pending';
        this._value = undefined;
        executor(this._resolve, this._reject);
    }
    _resolve(data) {
        this._state = 'fulfilled';
        this._value = data;
    };
    _reject(reason) {
        this._state = 'rejected';
        this._value = reason;
    };
}
```

到这里会遇到第一个问题

此时如果我们尝试调用一下

new MyPromise((resolve, reject) => {
    resovle(1);
})

会发现有报错

Cannot set properties of undefined (setting _state)

意思是 _resolve方法内的this是undefined

原因是 resolve方法我们是直接调用的 并且我们使用了es6的class 因此默认是严格模式 

直接调用方法+严格模式 导致了this为undefined

解决方法 使用bind

bind会返回一个新的方法 并且按照指定的this去执行方法

```javascript
class MyPromise {
    constructor(executor) {
        this._state = 'pending';
        this._value = undefined;
        executor(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(data) {
        this._state = 'fulfilled';
        this._value = data;
    };
    _reject(reason) {
        this._state = 'rejected';
        this._value = reason;
    };
}
```
代码有些重复 而且有硬编码 可以优化一下
```javascript
const promiseState = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    constructor(executor) {
        this._state = promiseState.PENDING;
        this._value = undefined;
        executor(this._resolve.bind(this), this._reject.bind(this));
    }
    _changeState(state, value) {
        this._state = state;
        this._value = value;
    }
    _resolve(data) {
        this._changeState(promiseState.FULFILLED, data);
    };
    _reject(reason) {
        this._changeState(promiseState.REJECTED, reason);
    };
}

```
接下来还要补充一些功能

首先Promise对象的状态一旦从unsettled变成settled 就不能再变化了

其次executor函数执行过程中 如果有报错 那么状态就会变成rejected

根据这两点再补充一下代码
```javascript
const promiseState = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    constructor(executor) {
        this._state = promiseState.PENDING;
        this._value = undefined;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        }  catch (err) {
            this._reject(err);
        }
    }
    _changeState(state, value) {
        if(this._state !=== promiseState.PENDING) {
            return
        }
        this._state = state;
        this._value = value;
    }
    _resolve(data) {
        this._changeState(promiseState.FULFILLED, data);
    };
    _reject(reason) {
        this._changeState(promiseState.REJECTED, reason);
    };
}

```

初步搭建then方法

把Promise中then是怎么用的 写出来

```javascript
new Promise((resolve, reject) => {
    xxx...
}).then(
    (data) => {},
    (reason) => {}
)
```
即 then方法接受两个参数 并且两个参数都是函数 分别是onFulfilled, onRejected

且 then方法返回一个新的Promise对象

所以then方法我们可以搭建出一个代码框架

```javascript
then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject)=>{})
}
```
其次实现一个工具函数 调用这个函数 能够将函数放入微队列

需要分情况

node环境 存在一个process 且process有个方法叫 nextTick 这个方法就可以将函数加入微队列

浏览器环境 存在一个API叫 MutationObserver 同样可以把函数放入微队列 不过需要构造一下元素变化的场景

兜底 用settimeout来兜底 模拟加入微队列

```javascript
/**
 * 把传递的函数放到微队列
 * @param {Function} callback
 */
function runMicrotask(callback) {
  if (process && process.nextTick) {
    process.nextTick(callback)
  } else if (MutationObserver) {
    const p = document.createElement('p')
    const observer = new MutationObserver(callback)
    observer.observe(p, {
      childList: true,
    })
    p.innerHTML = '1'
  } else {
    setTimeout(callback, 0)
  }
}

```
创建执行队列

实现then的核心代码

首先我们知道 then方法中传入的函数 会被加入微队列 所以函数不会立即执行

同时我们也要知道 then方法中的函数 不是立即加入微队列的 只有当前任务的状态变成settled 才会加入微队列

为此我们需要内部有一个数组来记录这些等待被加入微队列的函数

定义一个数组_handlers

其实then的核心逻辑 就在于 这个数组该怎么设计 存哪些信息

回忆一下之前的逻辑

then除了返回一个新的Promise对象以外

还做了哪些事？

首先新的Promise对象的状态是什么？

想起之前分析过的3种情况

then需要结合旧任务的状态 以及 后续处理 来决定新任务的状态

所谓旧任务的状态就是 this._state

所谓后续处理就是 then接受的两个参数 onFulfilled onRejected

新任务的状态如何扭转 那就是调用new MyPromise的 resolve和reject

所以_handlers数组里 需要收集
1. 后续处理
2. 状态
3. resolve/reject ==> 用于扭转新任务的状态

```javascript
pushHandler() {
  this._handlers.push(
    {
      executor,
      state,
      resolve,
      reject
    }
  )
}

then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
        this.pushHandler(onFulfilled, 'fulfilled', resolve, reject);
        this.pushHandler(onRejected, 'rejected', resolve, reject);
    })
}

```
这里核心的点在于 为什么要在return new MyPromise里面再调用 pushHandler方法

这是因为只有在这里 才能拿到新任务（new MyPromise）的resolve和reject 我才能去操作新任务的状态

有了_handlers数组以后

首先需要有一个函数 来遍历数组 执行数组里的每个对象中的executor

```javascript
runHandlers() {
    if(this._state === 'pending') {
        return
    }
    //遍历数组
}
```


注意的问题

首先 哪些情况下需要调用runHandlers()

1. 状态改变之后 这一点很好理解  ==> _changeState()
2. new Promise((resolve)=>{resovle(1)}).then((data)=>{console.log(data)}) 这种情况下 new Promise以后直接resolve了 状态直接变成了fulfilled 
但是此时如果仅通过状态的变化去调用runHandlers会发现 此时_handlers是空数组 因为此时还没有执行then
只有then方法里 会去进行收集信息 塞入_handlers
所以
then方法里 也需要调用


其次 在runHandlers中 需要注意 遍历数组时 每执行了一个executor 就要把它删除掉 保证数组里的每个对象只会执行一次

这里要用到 JS中 遍历数组的同时 删除数组的遍历项 这里不能用for循环 会有问题


<img width="355" height="205" alt="image" src="https://github.com/user-attachments/assets/7f75aef2-7038-42b5-9349-e29c5a94a8dc" />


```javascript
_runHandlers() {
    console.log('--runHandlers--', this._handlers)
    if (this._state === promiseState.PENDING) {
      return
    }
    while (this._handlers.length) {
      // todo 处理单个对象
      this._handlers.shift()
    }
  }
```

单个handler中 有四个属性 回忆一下 这是我们在then方法中 收集到执行栈中的对象

四个属性的意义分别是

1. executor ==> 待执行的方法

2. state ==> 当前状态===state的时候 调用executor

3. resolve 用于决定then方法返回的Promise对象的状态的 resolve方法

4. reject 用于决定then方法返回的Promise对象的状态的 reject方法


```javascript
_dealOneHandler(handler) {
    runMicrotask() {
        if(handler.state !== this._state) {
            return
        }
        if (typeof handler.executor !== 'function') {
            if(this._state === 'fulfilled') {
                handler.resolve(this._value)
            } else if(this._state === 'rejected') {
                handler.reject(this._value)
            }
            return
        }
        try {
            const result = handler.executor(this._value); 
            if(isPromise(result)) {
                result.then(handler.resolve, handler.reject)
            } else {
                handler.resolve(result)
            }
        } catch(error) {
            handler.reject(error)
        }
    }
}

```
至此 Promise A+规范的所有代码就写完了

Promise 由 A+规范 和 一些API组成

下面再去实现一些Promise的API




-------------------------------------------------------------------------












**Promise相关 字节1面**
# JavaScript task scheduler implementation
_Exported on 2026/3/17 at GMT+8 9:57:10 from Cursor (2.5.26)_

---

**User**

用JS实现一个类
该类接受一个参数 表示最大可执行的多并发数量
比如 
const schedule = new Scheduler(2)
则最大可多并发执行2个任务

并且需要实现一个addTask方法
该方法接受两个参数 第一个表示具体task 第二个表示优先级

要求优先级越高的任务 越先执行

class Scheduler() {
constructor(concurrency) {
   this.concurrency = concurrency
}

addTask(...) {...}
}

---

**Cursor**

我来在 `paraphernalia` 目录下创建一个 `scheduler.js` 文件，实现这个带优先级的并发调度器。

让我先梳理一下设计思路：

1. **优先级队列**：用数组维护待执行任务，按优先级排序，优先级高的排在前面
2. **并发控制**：用计数器跟踪当前正在运行的任务数量
3. **调度逻辑**：每次有空闲槽位时，从队列中取出优先级最高的任务执行；任务完成后自动调度下一个
4. **返回 Promise**：`addTask` 返回一个 Promise，让调用方能获取任务结果

我们来运行一下测试，验证并发控制和优先级调度是否正确：

测试结果完全符合预期。我们来分析一下执行流程：

## 执行流程分析

| 时间 | 事件 | 说明 |
|------|------|------|
| 0ms | 任务A、B 开始 | 并发上限为2，A和B先到先执行 |
| 1000ms | B结束 → C开始 | 腾出1个槽位，队列中 C(优先级10) > D(优先级5) > E(优先级1)，C最先执行 |
| 1500ms | C结束 → D开始 | 队列中 D(优先级5) > E(优先级1)，D先执行 |
| 2000ms | A结束 → E开始 | 最后一个任务 E 执行 |
| 2000ms | D结束 | |
| 2500ms | E结束 | 全部完成 |

## 核心设计说明

```1:45:src/views/paraphernalia/scheduler.js
export default class Scheduler {
  constructor(concurrency) {
    this.maxConcurrency = concurrency
    this.runningCount = 0
    this.taskQueue = []
  }

  addTask(task, priority = 0) {
    return new Promise((resolve, reject) => {
      const wrappedTask = { task, priority, resolve, reject }
      this._enqueue(wrappedTask)
      this._schedule()
    })
  }

  _enqueue(wrappedTask) {
    let inserted = false
    for (let i = 0; i < this.taskQueue.length; i++) {
      if (wrappedTask.priority > this.taskQueue[i].priority) {
        this.taskQueue.splice(i, 0, wrappedTask)
        inserted = true
        break
      }
    }
    if (!inserted) {
      this.taskQueue.push(wrappedTask)
    }
  }

  _schedule() {
    while (this.runningCount < this.maxConcurrency && this.taskQueue.length > 0) {
      const { task, resolve, reject } = this.taskQueue.shift()
      this.runningCount++
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--
          this._schedule()
        })
    }
  }
}
```

三个关键点：

1. **`_enqueue`（插入排序）**：新任务按优先级插入到队列正确位置，保持队列始终有序（优先级高的在前）。
2. **`_schedule`（调度器）**：每次调度时用 `while` 循环尽可能多地填满并发槽位，从队列头部（优先级最高）取任务执行。
3. **`addTask` 返回 Promise**：将 `resolve/reject` 存入任务包装对象，任务执行完成后通过 `.then(resolve, reject)` 传递结果，调用方可以 `await` 获取任务返回值。










