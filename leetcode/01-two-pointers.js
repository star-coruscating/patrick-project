/**
 * ============================================================
 *   模式一：双指针 & 滑动窗口
 * ============================================================
 *
 * 【何时使用】
 *   看到"有序数组"、"子数组/子串"、"两个值的关系"、"原地操作" → 双指针
 *   看到"连续子数组/子串"、"最长/最短满足条件的" → 滑动窗口
 *
 * 【核心本质】
 *   双指针：用两个指针的移动规则，把 O(n²) 降到 O(n)
 *   滑动窗口：双指针的特化形式，维护一个"窗口"在数组上滑动
 */

// ============================================================
// 题目 1: 两数之和 II - 输入有序数组 (LeetCode 167)
// ============================================================
// 给定一个已排序的数组，找两个数使得它们的和等于目标值。
//
// 【暴力解】O(n²) 双重循环
// 【最优解】O(n) 对撞双指针
//
// 【思维过程】
// 数组有序是关键信息！有序 = 可以利用大小关系做判断。
// 左指针指最小，右指针指最大：
//   - 和太小 → 左指针右移（让和变大）
//   - 和太大 → 右指针左移（让和变小）
//   - 相等 → 找到了

function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSumSorted([1, 2, 3, 4, 5], 7)); // [1, 4] → 2+5=7

// ============================================================
// 题目 2: 三数之和 (LeetCode 15) ★★★ 超高频
// ============================================================
// 找出数组中所有和为 0 的三元组，不能重复。
//
// 【核心思路】
// 三数之和 = 固定一个数 + 两数之和。
// 排序后，外层遍历固定第一个数，内层用对撞双指针找另外两个。
//
// 【去重技巧】
// 排序后相同的数相邻，跳过重复值即可。

function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // 最小值大于0，不可能凑出0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复

    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // 去重
        while (left < right && nums[right] === nums[right - 1]) right--; // 去重
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]

// ============================================================
// 题目 3: 无重复字符的最长子串 (LeetCode 3) ★★★ 超高频
// ============================================================
// 找出字符串中不含重复字符的最长子串的长度。
//
// 【这是滑动窗口的经典模板题】
//
// 窗口 = [left, right] 之间的子串
// right 不断右移扩大窗口，遇到重复字符就移动 left 缩小窗口。
// 用 Set 或 Map 记录窗口内的字符。
//
// 【滑动窗口模板】
//   1. 初始化左右指针 left = right = 0
//   2. right 右移，将元素加入窗口
//   3. 当窗口不满足条件时，left 右移缩小窗口
//   4. 每次更新答案

function lengthOfLongestSubstring(s) {
  const window = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) {
      window.delete(s[left]);
      left++;
    }
    window.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // 3 ("wke")

// ============================================================
// 题目 4: 盛最多水的容器 (LeetCode 11)
// ============================================================
// 给定 n 条线段的高度，找两条线使得它们与 x 轴构成的容器盛水最多。
//
// 【关键洞察】
// 面积 = min(height[left], height[right]) × (right - left)
// 移动较矮的那根柱子，因为移动较高的那根不可能让面积更大。

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49

// ============================================================
// 题目 5: 合并区间 (LeetCode 56) ★★★ 高频
// ============================================================
// 给出若干区间，合并所有重叠的区间。
//
// 【思路】先按起点排序，然后顺序扫描合并。
// 当前区间的起点 <= 上一个区间的终点 → 有重叠，合并。

function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }

  return result;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]

/**
 * 【模式总结】
 *
 * 对撞双指针：有序数组找配对 → 两端向中间逼近
 *   适用：两数之和、三数之和、盛水容器
 *   本质：利用有序性，每次排除一个不可能的方向
 *
 * 快慢双指针：一快一慢探测 → 见链表章节
 *
 * 滑动窗口：连续子数组/子串问题 → 右扩左缩
 *   适用：最长无重复子串、最小覆盖子串、长度为K的子数组最大和
 *   模板：for(right) { 扩窗口; while(不满足) { 缩窗口; } 更新答案; }
 *
 * 区间合并：先排序，再线性扫描合并
 */
