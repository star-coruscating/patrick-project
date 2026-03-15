/**
 * ============================================================
 *   模式六：二分查找与排序
 * ============================================================
 *
 * 【二分查找的本质】
 *   不是"在有序数组中找数"，而是"在一个有单调性的搜索空间中缩小范围"。
 *   只要能把问题分成"满足条件"和"不满足条件"两半，就能二分。
 *
 * 【排序算法】
 *   面试最常考：快速排序、归并排序（需要手写）
 *   了解即可：堆排序、计数排序
 */

// ============================================================
// 二分查找模板（三种变体）
// ============================================================

// 标准二分：找到 target 的位置
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // 防溢出
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// 找左边界：target 第一次出现的位置
function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) left = mid + 1;
    else right = mid; // nums[mid] >= target，收缩右边界
  }

  return left;
}

// 找右边界：target 最后一次出现的位置
function upperBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] <= target) left = mid + 1;
    else right = mid;
  }

  return left - 1;
}

console.log(binarySearch([1, 2, 3, 4, 5], 3));  // 2
console.log(lowerBound([1, 2, 2, 2, 3], 2));     // 1 (第一个2)
console.log(upperBound([1, 2, 2, 2, 3], 2));     // 3 (最后一个2)

// ============================================================
// 题目 1: 搜索旋转排序数组 (LeetCode 33) ★★★ 高频
// ============================================================
// [4,5,6,7,0,1,2] 中搜索 target，要求 O(log n)。
//
// 【关键洞察】
// 旋转后，数组被分成两段有序的部分。
// 每次取 mid，必有一半是有序的。判断 target 在有序那半还是无序那半。

function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // 左半有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右半有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1

// ============================================================
// 题目 2: 在排序数组中查找元素的第一个和最后一个位置 (LeetCode 34)
// ============================================================
// 直接用上面的 lowerBound 和 upperBound 组合。

function searchRange(nums, target) {
  const first = lowerBound(nums, target);
  if (first >= nums.length || nums[first] !== target) return [-1, -1];
  const last = upperBound(nums, target);
  return [first, last];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]

// ============================================================
// 快速排序 (手写必考) ★★★
// ============================================================
// 【核心思想】分治
// 1. 选一个基准 (pivot)
// 2. 把比 pivot 小的放左边，大的放右边（partition）
// 3. 递归排序左右两部分
//
// 平均 O(n log n)，最坏 O(n²)（已排序数组 + 选第一个做 pivot）

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;

  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);

  return arr;
}

function partition(arr, left, right) {
  // 随机选 pivot 避免最坏情况
  const randomIdx = left + Math.floor(Math.random() * (right - left + 1));
  [arr[randomIdx], arr[right]] = [arr[right], arr[randomIdx]];

  const pivot = arr[right];
  let i = left; // i 指向"下一个应该放小元素的位置"

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

console.log(quickSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]

// ============================================================
// 归并排序 (手写必考) ★★★
// ============================================================
// 【核心思想】分治
// 1. 把数组分成两半
// 2. 递归排序每一半
// 3. 合并两个有序数组
//
// 稳定排序，始终 O(n log n)，但需要 O(n) 额外空间

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return mergeSorted(left, right);
}

function mergeSorted(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([3, 6, 8, 10, 1, 2, 1])); // [1, 1, 2, 3, 6, 8, 10]

// ============================================================
// 题目 3: 数组中的第K个最大元素 (LeetCode 215) ★★★ 高频
// ============================================================
// 【方法1】排序后取第 k 个 O(n log n)
// 【方法2】快速选择 (QuickSelect) O(n) 平均 — 快排的变体
//
// 快速选择：只排 partition 后 pivot 所在的那一侧。
// 第 K 大 = 第 (n-k) 小

function findKthLargest(nums, k) {
  const target = nums.length - k; // 转换为第 target 小

  function quickSelect(left, right) {
    const pivotIndex = partition(nums, left, right);

    if (pivotIndex === target) return nums[pivotIndex];
    if (pivotIndex < target) return quickSelect(pivotIndex + 1, right);
    return quickSelect(left, pivotIndex - 1);
  }

  return quickSelect(0, nums.length - 1);
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4

/**
 * 【模式总结】
 *
 * 二分查找：
 *   标准二分 → left <= right, 找到返回
 *   左边界 → left < right, right = mid
 *   右边界 → left < right, left = mid + 1
 *   旋转数组 → 判断哪半有序，缩小范围
 *
 * 排序：
 *   快排 → partition + 递归，平均 O(n log n)
 *   归并 → 分治 + 合并，稳定 O(n log n)
 *   快速选择 → 快排的部分版，找第 K 大/小
 *
 * 【二分的隐藏考法】
 * "最小化最大值" / "最大化最小值" 类问题也能二分！
 * 例如：分割数组的最大值、吃香蕉的速度。
 * 思路：二分答案，用贪心/模拟验证答案是否可行。
 */
