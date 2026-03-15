/**
 * ============================================================
 *   模式三：栈与队列
 * ============================================================
 *
 * 【栈的本质】后进先出 (LIFO)
 *   看到"匹配"、"嵌套"、"最近的"、"撤销" → 栈
 *
 * 【单调栈】栈内元素保持单调递增或递减
 *   看到"下一个更大/更小元素"、"柱状图面积" → 单调栈
 *
 * 【队列的本质】先进先出 (FIFO)
 *   看到"层序"、"BFS"、"先来先服务" → 队列
 */

// ============================================================
// 题目 1: 有效的括号 (LeetCode 20) ★★★ 超高频
// ============================================================
// 判断字符串中的括号是否有效。
// "()[]{}" → true, "(]" → false, "([)]" → false
//
// 【为什么用栈？】
// 括号匹配是"最近的左括号匹配最近的右括号" → 后进先出 → 栈！
// 遇到左括号入栈，遇到右括号弹栈匹配。

function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const c of s) {
    if (c === "(" || c === "[" || c === "{") {
      stack.push(c);
    } else {
      if (stack.pop() !== pairs[c]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false
console.log(isValid("([)]"));   // false
console.log(isValid("{[]}"));   // true

// ============================================================
// 题目 2: 最小栈 (LeetCode 155) ★★★ 高频
// ============================================================
// 设计一个栈，支持 push、pop、top 和 O(1) 获取最小值。
//
// 【关键洞察】
// 用一个辅助栈同步记录"当前状态下的最小值"。
// 每次 push 时，辅助栈存入 min(新值, 当前最小值)。

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // 同步记录每个状态的最小值
  }

  push(val) {
    this.stack.push(val);
    const currentMin =
      this.minStack.length === 0
        ? val
        : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

const ms = new MinStack();
ms.push(-2);
ms.push(0);
ms.push(-3);
console.log(ms.getMin()); // -3
ms.pop();
console.log(ms.top());    // 0
console.log(ms.getMin()); // -2

// ============================================================
// 题目 3: 每日温度 (LeetCode 739) ★★★ 单调栈经典
// ============================================================
// 给定每天的温度数组，返回：对于每一天，要等几天才能等到更高温度。
// 输入: [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
//
// 【暴力】O(n²) 对每天往后扫描
// 【单调栈】O(n) 栈内存下标，维护递减
//
// 【思维过程】
// "找下一个更大元素" = 单调栈的标志性问题。
// 从左到右遍历，栈内维护一个递减序列（存下标）。
// 当前温度 > 栈顶温度时，说明栈顶找到了"下一个更高温度"，
// 弹出栈顶并计算天数差。

function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // 存下标，栈内温度递减

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1, 1, 4, 2, 1, 1, 0, 0]

// ============================================================
// 题目 4: 用栈实现队列 (LeetCode 232)
// ============================================================
// 用两个栈实现一个队列。
//
// 【核心思想】
// 栈是反序的，两次反序 = 正序！
// pushStack 负责入队，popStack 负责出队。
// 出队时如果 popStack 为空，就把 pushStack 全部倒进去。

class MyQueue {
  constructor() {
    this.pushStack = [];
    this.popStack = [];
  }

  push(x) {
    this.pushStack.push(x);
  }

  _transfer() {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop());
      }
    }
  }

  pop() {
    this._transfer();
    return this.popStack.pop();
  }

  peek() {
    this._transfer();
    return this.popStack[this.popStack.length - 1];
  }

  empty() {
    return this.pushStack.length === 0 && this.popStack.length === 0;
  }
}

const q = new MyQueue();
q.push(1);
q.push(2);
console.log(q.peek());  // 1
console.log(q.pop());   // 1
console.log(q.empty()); // false

/**
 * 【模式总结】
 *
 * 括号匹配 → 栈（最近匹配原则）
 * O(1)获取极值 → 辅助栈同步维护
 * 下一个更大/更小元素 → 单调栈
 * 栈 ↔ 队列互相实现 → 两个栈倒腾
 *
 * 【单调栈万能模板】
 * for (let i = 0; i < n; i++) {
 *   while (stack.length && 当前元素与栈顶的关系满足条件) {
 *     弹出栈顶，处理结果;
 *   }
 *   当前元素入栈;
 * }
 */
