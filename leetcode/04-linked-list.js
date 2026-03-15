/**
 * ============================================================
 *   模式四：链表
 * ============================================================
 *
 * 【为什么考链表？】
 *   链表题考的不是算法，而是"指针操作的细心程度"。
 *   面试官想看你能否在复杂指针操作中不出错。
 *
 * 【三大技巧】
 *   1. 虚拟头节点 (dummy node)：统一处理头节点的边界情况
 *   2. 快慢指针：找中点、判环
 *   3. 画图！画图！画图！链表题一定要画图理解指针变化
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function createList(arr) {
  const dummy = new ListNode();
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// ============================================================
// 题目 1: 反转链表 (LeetCode 206) ★★★ 必会
// ============================================================
// 1→2→3→4→5 变成 5→4→3→2→1
//
// 【迭代法】维护 prev 和 current 两个指针
// 每一步：保存 next → 当前指向 prev → prev 前移 → current 前移
//
// 画图理解：
//   prev  current  next
//   null    1  →  2 → 3 → 4 → 5
//   null ← 1     2 → 3 → 4 → 5  (1 指向 null)
//          prev  current

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next; // 先保存下一个
    current.next = prev;       // 反转指向
    prev = current;            // prev 前移
    current = next;            // current 前移
  }

  return prev; // prev 就是新的头
}

console.log(listToArray(reverseList(createList([1, 2, 3, 4, 5]))));
// [5, 4, 3, 2, 1]

// 【递归法】思维更优雅，面试能加分
function reverseListRecursive(head) {
  if (!head || !head.next) return head;

  const newHead = reverseListRecursive(head.next);
  // 此时 head.next 是反转后子链的尾节点
  head.next.next = head; // 让尾节点指向当前节点
  head.next = null;      // 当前节点变成新的尾
  return newHead;
}

// ============================================================
// 题目 2: 环形链表 (LeetCode 141) ★★★ 高频
// ============================================================
// 判断链表是否有环。
//
// 【快慢指针】
// 快指针每次走 2 步，慢指针每次走 1 步。
// 如果有环，快指针一定会追上慢指针（就像跑圆形跑道）。
// 如果无环，快指针会先到达 null。

function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}

// ============================================================
// 题目 3: 合并两个有序链表 (LeetCode 21) ★★★ 高频
// ============================================================
// 将两个升序链表合并为一个升序链表。
//
// 【dummy 节点技巧】
// 创建一个虚拟头节点，避免处理"谁当头"的边界问题。
// 每次从两个链表中选较小的接在后面。

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode();
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2; // 剩余部分直接接上

  return dummy.next;
}

console.log(
  listToArray(mergeTwoLists(createList([1, 2, 4]), createList([1, 3, 4])))
); // [1, 1, 2, 3, 4, 4]

// ============================================================
// 题目 4: LRU 缓存 (LeetCode 146) ★★★★ 超高频
// ============================================================
// 设计 LRU (最近最少使用) 缓存机制。
// get(key): O(1) 获取值，并标记为最近使用
// put(key, value): O(1) 写入，容量满时淘汰最久未使用的
//
// 【数据结构选择】
// O(1) 查找 → 哈希表
// O(1) 插入/删除 + 维护顺序 → 双向链表
// 所以：哈希表 + 双向链表
//
// 链表头 = 最近使用，链表尾 = 最久未使用
// 每次访问：把节点移到头部
// 容量满时：删除尾部节点

class DLinkedNode {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    // 哨兵节点，简化边界操作
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  _removeTail() {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._moveToHead(node);
    } else {
      const node = new DLinkedNode(key, value);
      this.map.set(key, node);
      this._addToHead(node);

      if (this.map.size > this.capacity) {
        const removed = this._removeTail();
        this.map.delete(removed.key);
      }
    }
  }
}

const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1));  // 1 (1 变成最近使用)
lru.put(3, 3);            // 淘汰 key=2
console.log(lru.get(2));  // -1 (已被淘汰)
lru.put(4, 4);            // 淘汰 key=1
console.log(lru.get(1));  // -1
console.log(lru.get(3));  // 3
console.log(lru.get(4));  // 4

/**
 * 【模式总结】
 *
 * 反转链表 → prev/current 双指针（或递归）
 * 判环/找中点 → 快慢指针
 * 合并/哑节点 → dummy node 消除边界
 * LRU → 哈希表 + 双向链表（设计题超高频）
 *
 * 【链表题的通用技巧】
 * 1. 永远画图，标清每一步的指针变化
 * 2. 用 dummy node 简化头节点处理
 * 3. 修改指针前，先用临时变量保存 next
 * 4. 递归法往往更简洁，但要注意栈溢出
 */
