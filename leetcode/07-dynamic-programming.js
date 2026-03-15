/**
 * ============================================================
 *   模式七：动态规划 (Dynamic Programming)
 * ============================================================
 *
 * 【DP 的本质】
 *   把一个大问题拆成重叠的子问题，记住子问题的答案避免重复计算。
 *   递归是自顶向下，DP 是自底向上。
 *
 * 【DP 解题四步法】
 *   1. 定义状态：dp[i] 代表什么？（这是最关键的一步）
 *   2. 状态转移方程：dp[i] 和之前的状态有什么关系？
 *   3. 初始化：最小子问题的答案是什么？
 *   4. 遍历顺序：确保计算 dp[i] 时，依赖的状态已经算过
 *
 * 【何时想到 DP？】
 *   - 求"最优值"（最大/最小/最长/最短）
 *   - 求"方案数"
 *   - "能否达成"（true/false）
 *   - 问题有"最优子结构" + "重叠子问题"
 */

// ============================================================
// 题目 1: 爬楼梯 (LeetCode 70) ★★★ 入门经典
// ============================================================
// 每次可以爬 1 或 2 阶，到第 n 阶有多少种方法？
//
// 【状态定义】dp[i] = 到第 i 阶的方法数
// 【转移方程】dp[i] = dp[i-1] + dp[i-2]
//   （到第 i 阶，要么从 i-1 爬 1 阶，要么从 i-2 爬 2 阶）
// 【初始化】dp[1] = 1, dp[2] = 2
//
// 这就是斐波那契数列！可以优化到 O(1) 空间。

function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

console.log(climbStairs(3));  // 3
console.log(climbStairs(5));  // 8
console.log(climbStairs(10)); // 89

// ============================================================
// 题目 2: 零钱兑换 (LeetCode 322) ★★★ 经典
// ============================================================
// 给定不同面额的硬币和总金额，求凑成总金额的最少硬币数。
//
// 【状态定义】dp[i] = 凑成金额 i 的最少硬币数
// 【转移方程】dp[i] = min(dp[i - coin] + 1) for each coin
// 【初始化】dp[0] = 0（金额为0不需要硬币）
//
// 本质：完全背包问题。

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)
console.log(coinChange([2], 3));         // -1
console.log(coinChange([1], 0));         // 0

// ============================================================
// 题目 3: 最长递增子序列 (LeetCode 300) ★★★ 高频
// ============================================================
// 找出数组中最长严格递增子序列的长度（子序列不要求连续）。
// [10,9,2,5,3,7,101,18] → 4 ([2,3,7,101])
//
// 【方法1: O(n²) DP】
// dp[i] = 以 nums[i] 结尾的 LIS 长度
// dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
//
// 【方法2: O(n log n) 贪心 + 二分】更优，面试中能答出加分

// O(n²) 版本 —— 容易理解
function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1); // 每个元素自身就是长度1的子序列

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

// O(n log n) 版本 —— 用一个辅助数组 tails
// tails[i] = 长度为 i+1 的递增子序列的最小末尾
// 用二分查找在 tails 中找到当前数应该插入的位置
function lengthOfLIS_optimized(nums) {
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }

    tails[left] = num;
  }

  return tails.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLIS_optimized([10, 9, 2, 5, 3, 7, 101, 18])); // 4

// ============================================================
// 题目 4: 最长公共子序列 (LeetCode 1143) ★★★ 高频
// ============================================================
// 求两个字符串的最长公共子序列长度。
// "abcde" 和 "ace" → 3 ("ace")
//
// 【二维 DP】
// dp[i][j] = text1 前 i 个字符与 text2 前 j 个字符的 LCS 长度
//
// 转移方程：
//   text1[i-1] === text2[j-1] → dp[i][j] = dp[i-1][j-1] + 1
//   不相等 → dp[i][j] = max(dp[i-1][j], dp[i][j-1])

function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequence("abc", "def"));   // 0

// ============================================================
// 题目 5: 买卖股票的最佳时机 (LeetCode 121) ★★★ 超高频
// ============================================================
// 给定股票价格数组，只能买卖一次，求最大利润。
//
// 【贪心/DP 思想】
// 遍历时记录到目前为止的最低价格，当前价格 - 最低价格 = 当前能获得的最大利润。

function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (1买6卖)
console.log(maxProfit([7, 6, 4, 3, 1]));     // 0 (一直跌，不买)

// ============================================================
// 题目 6: 打家劫舍 (LeetCode 198) ★★★
// ============================================================
// 相邻房屋不能同时偷，求能偷到的最大金额。
//
// dp[i] = 前 i 间房能偷到的最大金额
// dp[i] = max(dp[i-1], dp[i-2] + nums[i])
// （第 i 间不偷 → dp[i-1]，偷 → dp[i-2] + nums[i]）

function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

console.log(rob([1, 2, 3, 1]));     // 4 (1+3)
console.log(rob([2, 7, 9, 3, 1]));  // 12 (2+9+1)

/**
 * 【模式总结 & DP 分类】
 *
 * 一维 DP：
 *   爬楼梯/打家劫舍 → dp[i] 只依赖前几个状态
 *   最长递增子序列 → dp[i] 依赖 0~i-1 所有状态
 *   股票问题 → 贪心 or 状态机 DP
 *
 * 二维 DP：
 *   最长公共子序列 → dp[i][j] 两个序列的匹配
 *   编辑距离 → 同上
 *   背包问题 → dp[i][j] 前 i 个物品、容量 j
 *
 * 完全背包：
 *   零钱兑换 → 每种硬币可以用无限次
 *
 * 【DP 优化技巧】
 * 空间优化：如果 dp[i] 只依赖 dp[i-1] 和 dp[i-2]，
 * 可以用两个变量代替整个数组 → O(1) 空间。
 */
