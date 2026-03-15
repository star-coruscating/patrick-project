/**
 * ============================================================
 *   模式八：DFS / BFS / 回溯
 * ============================================================
 *
 * 【三者的关系】
 *   DFS (深度优先搜索) = 一条路走到黑，走不通再回头
 *   BFS (广度优先搜索) = 一层一层往外扩展
 *   回溯 = DFS + 撤销选择（穷举所有可能）
 *
 * 【何时用什么？】
 *   最短路径/最少步数 → BFS
 *   遍历所有方案/路径 → DFS/回溯
 *   排列/组合/子集 → 回溯
 *   连通区域 → DFS 或 BFS 都行
 */

// ============================================================
// 题目 1: 岛屿数量 (LeetCode 200) ★★★ 超高频
// ============================================================
// 给一个 '1'(陆地)和'0'(水) 组成的二维网格，计算岛屿数量。
//
// 【思路】
// 遍历网格，遇到 '1' 就启动一次 DFS/BFS 把整个岛屿"淹没"（标记为 '0'）。
// 启动了几次 = 有几个岛。

function numIslands(grid) {
  if (!grid || !grid.length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;

    grid[r][c] = "0"; // 淹没，避免重复访问
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
); // 3

// ============================================================
// 题目 2: 全排列 (LeetCode 46) ★★★ 回溯经典
// ============================================================
// 给定没有重复数字的数组，返回所有可能的全排列。
//
// 【回溯模板】
// 回溯的本质是决策树的遍历。在每个节点上：
//   1. 做选择
//   2. 递归进入下一层
//   3. 撤销选择（回溯）
//
// 全排列的决策树：
//        []
//     /   |   \
//   [1]  [2]  [3]
//   / \   ...
// [1,2][1,3]
//  |     |
// [1,2,3][1,3,2]

function permute(nums) {
  const result = [];

  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]); // 注意要拷贝！
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // 跳过已用的数

      path.push(nums[i]);    // 做选择
      used[i] = true;
      backtrack(path, used);  // 递归
      path.pop();             // 撤销选择
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

console.log(permute([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// ============================================================
// 题目 3: 子集 (LeetCode 78) ★★★
// ============================================================
// 给定不含重复元素的整数数组，返回所有子集。
//
// 【思路】每个元素有两种选择：选 or 不选
// 也可以用回溯：从第 i 个元素开始，依次选择后面的元素

function subsets(nums) {
  const result = [];

  function backtrack(start, path) {
    result.push([...path]); // 每个状态都是一个合法子集

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path); // i+1 保证不重复选
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(subsets([1, 2, 3]));
// [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]

// ============================================================
// 题目 4: 组合总和 (LeetCode 39) ★★★
// ============================================================
// 从候选数中选数（可重复使用），使和为 target，返回所有组合。
//
// 和子集的区别：可以重复选当前元素（递归时传 i 而不是 i+1）

function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, path, remaining) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, path, remaining - candidates[i]); // i 不是 i+1，允许重复
      path.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}

console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]

// ============================================================
// 题目 5: 单词搜索 (LeetCode 79) ★★★ 高频
// ============================================================
// 在二维网格中搜索单词，路径可以上下左右移动，不能重复使用同一格。
//
// 【典型的 DFS + 回溯】在网格上做 DFS

function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[index]) return false;

    const temp = board[r][c];
    board[r][c] = "#"; // 标记已访问

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    board[r][c] = temp; // 回溯，恢复原状

    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
); // true

/**
 * 【回溯模板（万能版）】
 *
 * function backtrack(路径, 选择列表) {
 *   if (满足结束条件) {
 *     result.push(路径的拷贝);
 *     return;
 *   }
 *
 *   for (选择 of 选择列表) {
 *     if (不合法) continue;  // 剪枝
 *     做选择;
 *     backtrack(路径, 选择列表);
 *     撤销选择;               // 回溯
 *   }
 * }
 *
 * 【排列 vs 组合 vs 子集】
 * 排列：used 数组标记已用元素，每次从头遍历
 * 组合：传 start 参数，每次从 start 开始（避免重复）
 * 子集：和组合一样，但每个中间状态都收集
 *
 * 【网格 DFS 模板】
 * function dfs(r, c) {
 *   if (越界 || 已访问 || 不满足) return;
 *   标记已访问;
 *   dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
 *   [可选] 取消标记（如果需要回溯）;
 * }
 */
