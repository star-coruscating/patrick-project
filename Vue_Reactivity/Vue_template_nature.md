***模板的本质 就是渲染函数 渲染函数的返回值是虚拟DOM***

在vue的SFC进行编译时  会经过一个模板编译器 对于模板编译器而言 <template>.....</template> 整个template 其实就是字符串 '<template>.....</template>'

经历以下流程

<img width="895" height="525" alt="image" src="https://github.com/user-attachments/assets/e646ae65-7b15-4b85-9261-27926f4301d8" />

通过使用模板 极大降低了我们在开发时的心理负担 这是框架带来的好处

在工程化的环境当中 模版都是预编译的 即在打包的过程中已经完成了模板的编译

可以使用vite-plugin-inspect插件

<img width="1446" height="718" alt="image" src="https://github.com/user-attachments/assets/b0a19c22-f91b-4ac2-8acf-614fd0f5dd3a" />


这里可以非常清晰的看出来 模板中的代码 最终转换成了什么样的JS代码（渲染函数）
