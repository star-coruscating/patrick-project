/**
 * ============================================================
 *   模式二：哈希表 (Hash Table / Map / Set)
 * ============================================================
 *
 * 【何时使用】
 *   - 需要 O(1) 查找/判重 → 用 Set
 *   - 需要 O(1) 存取键值对 → 用 Map
 *   - 看到"出现次数"、"是否存在"、"找配对" → 哈希表
 *
 * 【核心本质】
 *   空间换时间。把 O(n) 的查找降到 O(1)。
 *   几乎所有 "两次遍历" 都能用哈希表优化成 "一次遍历"。
 */

// ============================================================
// 题目 1: 两数之和 (LeetCode 1) ★★★ 最经典的面试题
// ============================================================
// 给定数组和目标值，找出和为目标值的两个数的下标。
//
// 【暴力解】O(n²) 双重循环，逐对检查
// 【哈希解】O(n) 遍历一次，边走边查
//
// 【思维过程】
// 对于每个数 nums[i]，我需要找 target - nums[i]。
// 问题变成：之前遍历过的数里有没有这个值？→ 哈希表！
// 一次遍历：先查表，再存表。

function twoSum(nums, target) {
  const map = new Map(); // 值 → 下标

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]

// ============================================================
// 题目 2: 字母异位词分组 (LeetCode 49) ★★★ 高频
// ============================================================
// 将字母异位词（字母相同但顺序不同的单词）分组。
// 输入: ["eat","tea","tan","ate","nat","bat"]
// 输出: [["eat","tea","ate"],["tan","nat"],["bat"]]
//
// 【关键洞察】
// 异位词排序后是相同的字符串！
// 所以：排序后的字符串 → 作为哈希表的 key

function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const key = [...str].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return [...map.values()];
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

// ============================================================
// 题目 3: 最长连续序列 (LeetCode 128) ★★★ 高频
// ============================================================
// 给定未排序数组，找最长连续元素序列的长度。要求 O(n)。
// 例: [100,4,200,1,3,2] → 4 (序列 [1,2,3,4])
//
// 【为什么不能排序？】题目要求 O(n)，排序是 O(n log n)
//
// 【思路】
// 用 Set 存所有数。对于每个数，只在它是序列起点时才开始计数。
// 怎么判断是起点？num - 1 不在 Set 里 → 它就是起点。
// 这保证每个数最多被访问两次，总体 O(n)。

function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;

  for (const num of set) {
    if (set.has(num - 1)) continue; // 不是起点，跳过

    let current = num;
    let length = 1;
    while (set.has(current + 1)) {
      current++;
      length++;
    }
    maxLen = Math.max(maxLen, length);
  }

  return maxLen;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9

// ============================================================
// 题目 4: 有效的字母异位词 (LeetCode 242)
// ============================================================
// 判断两个字符串是否是字母异位词。
//
// 【方法1】排序比较 O(n log n)
// 【方法2】计数比较 O(n) —— 用哈希表统计每个字符出现次数

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Map();
  for (const c of s) count.set(c, (count.get(c) || 0) + 1);
  for (const c of t) {
    const val = count.get(c);
    if (!val) return false;
    count.set(c, val - 1);
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false

/**
 * 【模式总结】
 *
 * "查找配对" → 一边遍历一边存 Map（两数之和模式）
 * "分组归类" → 找到共同特征作为 key（异位词分组模式）
 * "去重 + O(1)查找" → Set（最长连续序列模式）
 * "计数统计" → Map 计频（异位词判定模式）
 *
 * 面试中如果你想不到最优解，先说"我可以用哈希表优化查找"，
 * 这句话在 80% 的题目中都是对的。
 */
