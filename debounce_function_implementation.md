# Debounce function implementation
_Exported on 2026/2/28 at GMT+8 15:07:18 from Cursor (2.4.27)_

---

**User**

手写一个debounce

---

**Cursor**

以下是一个手写的 `debounce` 防抖函数实现：

```javascript
function debounce(fn, delay, immediate = false) {
  let timer = null

  const debounced = function (...args) {
    const callNow = immediate && !timer

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      if (!immediate) fn.apply(this, args)
    }, delay)

    if (callNow) fn.apply(this, args)
  }

  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}
```

**核心思路：**

1. **基本防抖** — 每次调用时清除上一次的定时器，重新计时。只有在停止触发 `delay` 毫秒后，才真正执行 `fn`。
2. **立即执行（`immediate`）** — 第一次触发时立即执行，后续在 `delay` 内的触发会被忽略，直到冷却结束后才能再次立即执行。
3. **取消能力（`cancel`）** — 提供 `cancel` 方法，可以手动取消还未执行的延迟调用。
4. **保留上下文** — 使用 `fn.apply(this, args)` 确保 `this` 指向和参数正确传递。

**使用示例：**

```javascript
const handleInput = debounce((value) => {
  console.log('搜索:', value)
}, 300)

// 立即执行模式
const handleClick = debounce(() => {
  console.log('点击')
}, 500, true)

// 取消
handleInput.cancel()
```

> **补充说明**：项目中推荐直接使用 Lodash 的 `debounce`（见团队规范 12.6），手写版本适合面试或理解原理场景。

