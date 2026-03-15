/**
 * ============================================================
 *   模式五：二叉树
 * ============================================================
 *
 * 【为什么二叉树是重中之重？】
 *   二叉树是"递归思维"的最佳训练场。
 *   掌握二叉树 = 掌握递归 = 掌握分治 = 掌握 DFS。
 *
 * 【解题框架 - 只有两种思路】
 *   1. 遍历思路：用一个变量在遍历过程中收集答案
 *   2. 分解思路：把问题分解为左右子树的子问题（更常用）
 *
 * 【递归三要素】
 *   1. 参数和返回值：这个函数要做什么？
 *   2. 终止条件：什么时候停？（通常是 node === null）
 *   3. 单层逻辑：假设子问题已解决，当前节点怎么做？
 */

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(arr, index = 0) {
  if (index >= arr.length || arr[index] === null) return null;
  const node = new TreeNode(arr[index]);
  node.left = buildTree(arr, 2 * index + 1);
  node.right = buildTree(arr, 2 * index + 2);
  return node;
}

// ============================================================
// 基础: 四种遍历（必须闭眼写出来）
// ============================================================

// 前序：根 → 左 → 右
function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// 中序：左 → 根 → 右（BST 的中序遍历是有序的！）
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// 后序：左 → 右 → 根
function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}

// 层序（BFS）：逐层从左到右
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }

  return result;
}

const tree = buildTree([3, 9, 20, null, null, 15, 7]);
console.log("前序:", preorder(tree));     // [3, 9, 20, 15, 7]
console.log("中序:", inorder(tree));      // [9, 3, 15, 20, 7]
console.log("后序:", postorder(tree));    // [9, 15, 7, 20, 3]
console.log("层序:", levelOrder(tree));   // [[3], [9, 20], [15, 7]]

// ============================================================
// 题目 1: 二叉树的最大深度 (LeetCode 104) ★★★
// ============================================================
// 【分解思路】
// 最大深度 = max(左子树深度, 右子树深度) + 1
// 这就是递归的魅力：假设子问题已经解决了，只关注当前怎么做。

function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

console.log("最大深度:", maxDepth(tree)); // 3

// ============================================================
// 题目 2: 翻转二叉树 (LeetCode 226) ★★★
// ============================================================
// 把每个节点的左右子树交换。
// 【分解思路】递归翻转左子树，递归翻转右子树，然后交换。

function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}

// ============================================================
// 题目 3: 对称二叉树 (LeetCode 101)
// ============================================================
// 判断二叉树是否镜像对称。
// 【思路】转化为：左子树和右子树是否互为镜像？
// 镜像条件：左.val === 右.val && 左.left 镜像 右.right && 左.right 镜像 右.left

function isSymmetric(root) {
  if (!root) return true;

  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    );
  }

  return isMirror(root.left, root.right);
}

// ============================================================
// 题目 4: 二叉树的最近公共祖先 (LeetCode 236) ★★★ 高频
// ============================================================
// 给定两个节点 p 和 q，找它们的最近公共祖先 (LCA)。
//
// 【递归分解】对于当前节点 root：
// - 如果 root 是 null/p/q → 直接返回 root
// - 递归搜索左子树和右子树
// - 如果左右都找到了 → root 就是 LCA
// - 如果只有一边找到 → 那一边的结果就是 LCA

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;  // p 和 q 分布在两侧
  return left || right;             // 都在同一侧
}

// ============================================================
// 题目 5: 路径总和 III (LeetCode 437) ★★★
// ============================================================
// 找出路径和等于目标值的路径数（路径不需要从根开始，也不需要到叶子结束）
//
// 【前缀和 + 哈希表思路】
// 类似数组的"连续子数组和"问题。
// 在树的路径上维护前缀和，用哈希表记录每个前缀和出现的次数。
// 当前前缀和 - target 在哈希表中出现过 → 说明存在一段路径和 = target

function pathSum(root, targetSum) {
  const prefixMap = new Map([[0, 1]]); // 前缀和为0出现1次
  let count = 0;

  function dfs(node, currentSum) {
    if (!node) return;

    currentSum += node.val;

    count += prefixMap.get(currentSum - targetSum) || 0;

    prefixMap.set(currentSum, (prefixMap.get(currentSum) || 0) + 1);
    dfs(node.left, currentSum);
    dfs(node.right, currentSum);
    prefixMap.set(currentSum, prefixMap.get(currentSum) - 1); // 回溯
  }

  dfs(root, 0);
  return count;
}

/**
 * 【模式总结】
 *
 * 二叉树题的万能思路：
 *   1. 能否把问题分解为"对左子树做X" + "对右子树做X"？→ 分解法
 *   2. 是否需要遍历整棵树收集信息？→ 遍历法
 *
 * 高频考点：
 *   - 四种遍历（前/中/后/层序）→ 必须秒写
 *   - 深度/高度 → 递归分解
 *   - 对称/翻转 → 镜像递归
 *   - LCA → 后序遍历 + 分情况讨论
 *   - 路径和 → 前缀和 + DFS
 *
 * 记住：二叉树的递归就是"信任子问题已经解决"。
 */
