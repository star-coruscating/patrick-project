JSX (JavaScript XML) 是一种语法糖 JSX的本质是JS对象 

**在 Vue 中 使用 template 模板来描述页面**


**在 React 中 使用 JSX 来描述页面**


```javascript
function App() {
  return (
    <div>Hello React~</div>
  )
}

```
首先明确 哪里是JSX

```javascript
function App() {}
```
 ==> 这部分都是JS语法






 ```javascript
<div>Hello React~</div>
```
==> 这部分是JSX



| JSX | Vue--template |
| :--- | :--- |
| 只允许一个根元素 但是可以使用 <>  </> | 从Vue3开始 可以支持多根元素 |
| JS表达式 写在单大括号当中 {} | JS表达式 写在双大括号当中 {{ }} |
| 标签的动态属性值 写在单大括号中 {} | 标签的动态属性值 使用： |
| className="aa" | class="aa" |
| {/* 这是一个注释 */} | <!-- 这是一个注释 --> |
| JSX允许在模板中插入数组 数组会自动展开所有成员 | 通常使用v-for指令来渲染数组 |

关于标签的动态属性 在template中可以直接通过v-bind来设置 而JSX中是通过单大括号来设置
<img width="528" height="237" alt="image" src="https://github.com/user-attachments/assets/0afa3ee9-1082-4697-ac44-14c154cda0d4" />

<img width="851" height="352" alt="image" src="https://github.com/user-attachments/assets/402cbd2b-d28a-4f66-9c92-b1002090abc1" />




=====================
思考 为什么在JSX中使用class会报错呢？
原因在于JSX本质上是一个JS对象 而class对于JS而言是一个系统保留关键字 所以报错


=======================
JSX是一种JS的语法扩展 Babel会把JSX转译成一个名为React.createElement函数调用

关于这一点 其实和vue的h函数 非常相似

```javascript
React.createElement(type, [props], [...children]);
```

下面两种代码的作用是完全相同的:


```javascript
const element1 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element2 = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```


结论: JSX的本质其实就是React.createElement方法的一种语法糖



React官网 JSX简介+元素渲染

