重要结论:
JS所有的对象 都是通过构造函数产生的
(JS所有的对象 都是通过 new 函数的方式创建的)


```javascript
// 这其实是 语法糖
var obj = {
  a: 1,
  b: 2
};

// 实际等价于
var obj = new Object();
obj.a = 1;
obj.b = 2;

```

```javascript
// 数组也是一样 都是语法糖
var arr = [1, 2, 3]


var arr = new Array(1, 2, 3);
```

在JS中 函数也是对象
```javascript
function sum(a, b) {
  return a + b;
}

const sum = new Function('a', 'b', 'return a + b')

```

构造函数、实例、原型 这三者就存在一个铁三角的关系
1. 实例 通过 new 构造函数产生
2. 构造函数 有一个属性 protoType 指向原型
3. 实例 有一个属性 `__proto__` 同样指向原型

`__proto__`: 隐式原型
*隐式原型是所有对象都有的
*原型 本质上也是对象

**实例的隐式原型 和构造函数的原型 指向的是同一个地址**

构造函数的原型 被所有实例共享（把一些方法写在原型中 所有的实例就都可以调用）

**当访问一个对象成员时 先看对象自身有没有 如果没有 依次在原型链上找**

补充一点：原型对象上还有一个 `constructor` 属性，**反向指回构造函数**，这样铁三角才真正闭合：

```
构造函数 ---prototype---> 原型对象
   ^                        |
   |                        |
   +----constructor---------+
   |
  new
   |
   v
  实例 ------__proto__-----> 原型对象（同一个）
```

---

## 1. 指向同一地址的好处

`Constructor.prototype === instance.__proto__` 这个设计的核心好处是**方法共享，节省内存**。

**如果没有原型共享：**

```javascript
function User(name) {
  this.name = name
  // 每个实例都创建一个全新的函数对象
  this.sayHi = function() { console.log('Hi, ' + this.name) }
}

const a = new User('Alice')
const b = new User('Bob')

a.sayHi === b.sayHi // false — 两个不同的函数对象，浪费内存
```

**有了原型共享：**

```javascript
function User(name) {
  this.name = name
}
User.prototype.sayHi = function() { console.log('Hi, ' + this.name) }

const a = new User('Alice')
const b = new User('Bob')

a.sayHi === b.sayHi // true — 同一个函数，来自同一个原型对象
```

因为 `a.__proto__` 和 `b.__proto__` 都指向 `User.prototype`，当访问 `a.sayHi` 时，JS 引擎在实例自身找不到，就沿着 `__proto__` 去原型上找——所有实例**共用同一份方法**，而各自的数据（`name`）存在实例自身上。

这就是**数据私有、方法共享**的设计思想。

---

## 2. 用 class 语法在原型上写方法

```javascript
class User {
  constructor(name) {
    this.name = name   // 实例自身属性
  }

  // 直接写在 class 体内的方法，自动挂载到 User.prototype 上
  sayHi() {
    console.log('Hi, ' + this.name)
  }

  getInfo() {
    return `User: ${this.name}`
  }
}
```

验证一下：

```javascript
const u = new User('Alice')

// 方法在原型上，不在实例自身
u.hasOwnProperty('sayHi')              // false
u.hasOwnProperty('name')               // true

// 原型链验证
u.__proto__ === User.prototype          // true
User.prototype.hasOwnProperty('sayHi') // true

// constructor 回指
User.prototype.constructor === User     // true
```

如果你不用 `class` 语法，等价的写法是：

```javascript
function User(name) {
  this.name = name
}

User.prototype.sayHi = function() {
  console.log('Hi, ' + this.name)
}

User.prototype.getInfo = function() {
  return `User: ${this.name}`
}
```

**`class` 本质上是原型继承的语法糖**，在 class 体内写的方法会被自动放到 `prototype` 上，效果完全一致。

---

**总结一句话：** 构造函数的 `prototype` 和实例的 `__proto__` 指向同一个对象，使得所有实例可以通过原型链共享方法，既节省内存，又实现了"继承"的效果。
