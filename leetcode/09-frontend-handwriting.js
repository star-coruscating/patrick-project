/**
 * ============================================================
 *   模式九：前端高频手写题
 * ============================================================
 *
 * 前端面试独有的笔试题型。你已经有 Promise、debounce、reactive 的实现，
 * 这里补充其他高频手写题。
 *
 * 【分类】
 *   1. 函数编程类：curry、compose、pipe
 *   2. 工具函数类：深拷贝、扁平化、类型判断
 *   3. 异步类：Promise 并发控制、async 调度器
 *   4. 设计模式类：发布订阅、观察者
 */

// ============================================================
// 1. 深拷贝 (Deep Clone) ★★★★ 超高频
// ============================================================
// JSON.parse(JSON.stringify(obj)) 的问题：
//   - 不能处理函数、undefined、Symbol
//   - 不能处理循环引用
//   - 不能处理 Date、RegExp、Map、Set
//
// 手写版需要处理这些边界情况。

function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (cache.has(obj)) return cache.get(obj); // 处理循环引用

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  if (obj instanceof Map) {
    const map = new Map();
    cache.set(obj, map);
    obj.forEach((val, key) => map.set(deepClone(key, cache), deepClone(val, cache)));
    return map;
  }

  if (obj instanceof Set) {
    const set = new Set();
    cache.set(obj, set);
    obj.forEach((val) => set.add(deepClone(val, cache)));
    return set;
  }

  const clone = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone);

  for (const key of Reflect.ownKeys(obj)) { // Reflect.ownKeys 包含 Symbol 键
    clone[key] = deepClone(obj[key], cache);
  }

  return clone;
}

// 测试循环引用
const testObj = { a: 1, b: { c: 2 } };
testObj.self = testObj;
const cloned = deepClone(testObj);
console.log(cloned.a, cloned.b.c, cloned.self === cloned); // 1 2 true
console.log(cloned !== testObj, cloned.b !== testObj.b);     // true true

// ============================================================
// 2. 数组扁平化 (Flatten) ★★★ 高频
// ============================================================
// [1, [2, [3, [4]]]] → [1, 2, 3, 4]
// 实现 Array.prototype.flat(depth)

function flatten(arr, depth = Infinity) {
  if (depth <= 0) return arr.slice();

  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

console.log(flatten([1, [2, [3, [4]]]]));       // [1, 2, 3, 4]
console.log(flatten([1, [2, [3, [4]]]], 1));     // [1, 2, [3, [4]]]
console.log(flatten([1, [2, [3, [4]]]], 2));     // [1, 2, 3, [4]]

// ============================================================
// 3. 函数柯里化 (Curry) ★★★ 高频
// ============================================================
// curry(fn)(1)(2)(3) === fn(1, 2, 3)
// curry(fn)(1, 2)(3) === fn(1, 2, 3)
//
// 【核心思路】收集参数，参数够了就执行，不够就继续返回函数。

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));    // 6
console.log(curriedAdd(1, 2)(3));    // 6
console.log(curriedAdd(1)(2, 3));    // 6

// ============================================================
// 4. 函数组合 (Compose / Pipe) ★★★
// ============================================================
// compose(f, g, h)(x) = f(g(h(x)))  从右到左
// pipe(f, g, h)(x) = h(g(f(x)))     从左到右

function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

function pipe(...fns) {
  return function (x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

console.log(compose(square, addOne, double)(3)); // square(addOne(double(3))) = square(7) = 49
console.log(pipe(double, addOne, square)(3));     // square(addOne(double(3))) = 49

// ============================================================
// 5. 发布订阅 (EventEmitter) ★★★ 高频
// ============================================================
// 实现 on、off、emit、once

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }

  off(event, callback) {
    if (!this.events.has(event)) return this;
    const cbs = this.events.get(event);
    this.events.set(
      event,
      cbs.filter((cb) => cb !== callback && cb._original !== callback)
    );
    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return this;
    for (const cb of this.events.get(event)) {
      cb.apply(this, args);
    }
    return this;
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(event, wrapper);
    };
    wrapper._original = callback; // 让 off 能通过原函数取消
    this.on(event, wrapper);
    return this;
  }
}

const emitter = new EventEmitter();
emitter.once("hello", (name) => console.log("once:", name));
emitter.on("hello", (name) => console.log("on:", name));
emitter.emit("hello", "world"); // once: world, on: world
emitter.emit("hello", "again"); // on: again（once 已自动移除）

// ============================================================
// 6. Promise 并发控制 ★★★★ 高频
// ============================================================
// 限制同时执行的异步任务数量。
// 例：有 10 个请求，最多同时发 3 个。
//
// 【核心思路】
// 维护一个运行池，每当一个任务完成就从队列中取下一个补上。

function promisePool(tasks, limit) {
  return new Promise((resolve) => {
    let running = 0;
    let index = 0;
    const results = [];

    function run() {
      if (index >= tasks.length && running === 0) {
        resolve(results);
        return;
      }

      while (running < limit && index < tasks.length) {
        const i = index++;
        running++;

        Promise.resolve(tasks[i]())
          .then((val) => {
            results[i] = val;
          })
          .catch((err) => {
            results[i] = err;
          })
          .finally(() => {
            running--;
            run();
          });
      }
    }

    run();
  });
}

// 测试
const createTask = (id, delay) => () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve(id);
    }, delay)
  );

promisePool(
  [
    createTask(1, 1000),
    createTask(2, 500),
    createTask(3, 300),
    createTask(4, 400),
    createTask(5, 200),
  ],
  2 // 最多同时执行 2 个
).then((results) => console.log("All done:", results));

// ============================================================
// 7. 手写 call / apply / bind ★★★
// ============================================================

Function.prototype.myCall = function (context, ...args) {
  context = context ?? globalThis;
  context = Object(context); // 处理原始类型
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function bound(...moreArgs) {
    // 作为构造函数调用时，this 指向实例而不是 context
    if (new.target) {
      return new fn(...args, ...moreArgs);
    }
    return fn.myCall(context, ...args, ...moreArgs);
  };
};

// ============================================================
// 8. instanceof 实现 ★★
// ============================================================
// 沿着原型链查找，看 prototype 是否出现在实例的原型链上

function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  const target = Constructor.prototype;

  while (proto !== null) {
    if (proto === target) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

console.log(myInstanceof([], Array));   // true
console.log(myInstanceof([], Object));  // true
console.log(myInstanceof({}, Array));   // false

// ============================================================
// 9. 节流 (Throttle) - 补充你的 debounce ★★★
// ============================================================
// 在一段时间内只执行一次。常用于 scroll、resize。
//
// 【防抖 vs 节流】
// 防抖：等你停下来才执行（搜索框输入）
// 节流：按固定频率执行（滚动监听）

function throttle(fn, delay) {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timer = null;
      }, delay - (now - lastTime));
    }
  };
}

// ============================================================
// 10. 对象扁平化 & 反扁平化 ★★★
// ============================================================
// { a: { b: { c: 1 }, d: 2 } } → { 'a.b.c': 1, 'a.d': 2 }

function flattenObject(obj, prefix = "", result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

function unflattenObject(obj) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split(".");
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  return result;
}

console.log(flattenObject({ a: { b: { c: 1 }, d: 2 } }));
// { 'a.b.c': 1, 'a.d': 2 }
console.log(unflattenObject({ "a.b.c": 1, "a.d": 2 }));
// { a: { b: { c: 1 }, d: 2 } }

/**
 * 【前端手写题总结】
 *
 * 最高频（必须熟练）：
 *   - 深拷贝（WeakMap 处理循环引用）
 *   - Promise 相关（你已有，加上并发控制）
 *   - 防抖节流（你已有 debounce，补 throttle）
 *   - 柯里化
 *   - EventEmitter
 *   - call/apply/bind
 *
 * 高频：
 *   - 数组/对象扁平化
 *   - compose/pipe
 *   - instanceof
 *   - new 的实现
 *
 * 关键原则：
 *   - 手写题的核心是"理解原理"，不是"背代码"
 *   - 面试时先说思路，再写代码
 *   - 注意边界：null、循环引用、原始类型
 */
