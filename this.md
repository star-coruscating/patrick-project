this 大方向上分为两种
1）全局代码中使用this 那么this指向全局对象 ==> 在浏览器中指向window 在node中指向global
2）在函数中使用this
     重要概念:  函数中的this 指向谁 取决于函数是如何被调用的 换句话说 当函数还没有被调用 只是单纯写了一个函数 此时内部的this指向谁 是未知的


| 调用方式 | 说明 | this指向 |
|---|---|---|
| 通过new调用 | const a = new Person() | 新对象（a） |
| 直接调用 | createPerson() | 全局对象 （严格模式下 为undefined） |
| 通过对象调用 | user1.checkName() | 前面的对象(user1) |
| call/apply/bind | bind和call/apply的不同在于
bind会返回一个新的函数
并且经过bind绑定了this指向以后
即便直接调用函数 this还是会以bind指定的为主

let d = new Date();
let fn = d.getTime.bind(d);
fn(); //此时即便是直接调用了fn 但是由于fn函数是经过了bind绑定 所以fn中的this依然指向d
 | 通过第一个参数 可以指定this |
| 箭头函数 | const i = () => {
  console.log(this.name)
}

i()

上面这个例子 即使是通过直接调用的方式调用的i
但是由于i是一个箭头函数 所以i中的this 指向的是外层作用域中的this
 | 外层作用域的this |


 this的使用场景:
 1. 一个普通对象中存在一个方法 这个方法中需要访问这个对象的属性 此时 往往需要使用this
 2. 在原型上写方法时 通常会用到this 因为写在原型上的方法 是需要通过obj.方法名() 这样的方式来调用的 此时this就指向前面的对象


