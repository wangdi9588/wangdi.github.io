## 一、作用域链

作用域和作用域链在Javascript和很多其它的编程语言中都是一种基础概念。但很多Javascript开发者并不真正理解它们，但这些概念对掌握Javascript至关重要。

#### 1.什么是作用域

Javascript中的作用域说的是变量的可访问性和可见性。也就是说整个程序中哪些部分可以访问这个变量，或者说这个变量都在哪些地方可见。   



#### 2.作用域类型

- 1)、全局作用域

  > 任何不在函数中或不在大括号中声明的变量，都是在全局作用域下，全局作用域下声明的变量可以在程序的任意位置访问到。
  >
  > ```javascript
  > var index = 1
  > function getIndex(){
  >     console.log(index)
  > }
  > //打印 1
  > getIndex()
  > //打印 1
  > console.log(window.index)
  > ```
  >
  > 

- 2)、函数作用域

  > 函数作用域也叫局部作用域，如果一个变量是在函数内部声明的他就在一个函数作用域下面，这些变量只能在函数内部访问，不能再函数以外去访问。
  >
  > ```javascript
  > function getIndex(){
  >     var index = 1
  >     console.log(index)
  > }
  > //打印1
  > getIndex()
  > // Uncaught (in promise) ReferenceError: index is not defined  
  > console.log(index)
  > ```

- 3)、块级作用域

  > ES6引入了let和const关键字，在大括号中使用let 和 const 声明的变量存在于块级作用域。在大括号之外不能访问这些变量。  
  >
  > ```javascript
  > {
  >     let name = 'Hello world';
  >     const age = 18;
  >     var lang = 'English'
  >     // 打印 'Hello world'
  >     console.log(name)
  > }
  > // 打印 'English'
  > console.log(lang)
  > // Uncaught ReferenceError: age is not defined
  > console.log(age)
  > ```
  >
  > 上面代码中可以看出，在大括号内使用`var`声明的变量lang是可以在大括号之外访问的。使用`var`声明的变量不存在块级作用域中。在大括号内使用const 声明的变量 age 不能在大括号之外访问

#### 3.作用域嵌套

```javascript
let a = 20;
function getAdd(){
    const b = 12 + a
    function getDeep(){
        const c = a + b + 10
        {
            let abc = `a:${a};b:${b};c:${c}`
            // 打印 a:20;b:32;c:62
            console.log(abc)
        }
        // 打印 62
        console.log(c)
        return c
    }
   	return getDeep()
}
const total = getAdd()
// 打印 62
console.log(total)
```

简单的例子，有四层作用域嵌套，第一层是块级作用域（有let声明的abc变量），第二层是getDeep函数作用域 （有const声明的c变量），第三层是 getAdd函数作用域（有const声明的b变量） ，第四层是全局作用域（有let声明的 a变量）

#### 4. 什么是作用域链

当在Javascript中使用一个变量的时候，首先Javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域。

如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错。

```javascript
let name = 'Dingdang';
function sayHay(){
    const age = 18;
    console.log(`Hi! I am ${name}, ${age}岁`)
}
sayHay()
```

当sayHay()函数调用时，console需要 age和name变量，javascript引擎会在当前函数作用域下寻找 age和name变量，但是该函数作用域内只有age变量，就会在上层作用域中寻找（该例中，上层作用域就是全局作用域了），找到 name变量。

**结论：**当使用一个变量的时候，Javascript引擎会循着作用域链一层一层往上找该变量，直到找到该变量为止。这一层层的关系就叫作用域链

#### 5.闭包

**闭包**是***Javascript***语言的一个难点，也是特色，很多高级应用都要依靠闭包来实现



## 二、js原型链

