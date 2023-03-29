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

#### 1.原型和原型对象

> 原型（prototype）是函数的一个属性，这个属性是个指针指向原型对象。无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个prototype属性（指向原型对象）。

> 原型对象是一个属于其所在函数的空对象，可以通过它给函数添加属性和方法，原型对象也拥有一个默认属性**constructor**指向其函数。

所有实例对象 需要共享的属性和方法，都放在原型对象里；不需要共享的属性和方法，放在构造函数里。

**每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被复制为构造函数的原型对象。脚本中没有访问这个[[Prototype]]特性的标准方式，但是Firefox、Safari和Chrome会在每个对象上暴露`__proto__`属性，通过这个属性可以访问对象的原型。**

```js
js之父在设计js原型、原型链的时候遵从以下两个准则
    1. Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
    2. person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**
```

![image-20230220183907833](https://wang-picture-bed.oss-cn-hangzhou.aliyuncs.com/picture_bed/image-20230220183907833.png)

**构造函数有一个prototype属性，引用其原型对象，而这个原型对象也有个constructor属性引用这个构造函数。换句话说，两者循环引用**

> 正常的原型链都会终止于Object的原型对象，Object的原型对象为null

#### 2.`__proto__`和prototype的区别

`__proto__(隐式原型)`：JavaScript中任意对象都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过`__proto__`来访问。ES5中有了对于这个内置属性标准的Get方法 Object.getPrototypeOf()。`__proto__`属性已在ECMAScript 6语言规范中标准化，用于确保Web浏览器的兼容性，因此它未来将被支持。它已被不推荐使用, 现在更推荐使用[Object.getPrototypeOf]/[Reflect.getPrototypeOf] 和[Object.setPrototypeOf]/Reflect.setPrototypeOf。

prototype(显式属性)：每个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。

> 注：通过Function.prototype.bind方法构造出来的函数是个例外，他没有prototype属性。

`__proto__`和prototype 不同，prototype 只在 Function 中有，而`__proto__`则在Function和Object中都有。即函数对象中才有prototype，实例对象中只有`__proto__`属性。



#### 3.函数与构造函数的区别

- ##### 构造函数需要new操作符实例化才能使用

- ##### 任何函数只要使用了new操作符调用就是构造函数，而不使用new操作符调用的函数就是普通函数。

- ##### 构造函数没有return语句

- ##### 构造函数this指向调用者，往往是调用构造函数的实例本身。而函数使用this则会指向window全局对象

- ##### 构造函数名首字母大写（非强制性的）

实例是构造函数创建出来的对象，拥有构造函数的属性和方法

- JavaScript中一切皆是对象。
- 所有对象有[[Prototype]]属性，指向其构造函数的原型对象。
- 所有函数都有prototype属性，指向其原型对象。
- 所有实例都有constructor属性，指向其构造函数。

#### 4.实例、构造函数和原型对象

- 它们是3个完全不同的对象。
- 实例通过`__proto__`链接到原型对象。它实际指向隐藏特性[[Prototype]]。
- 构造函数通过prototype属性链接到原型对象。
- 同一个构造函数创建的两个实例，共享同一个原型对象。

#### 5.new 操作符做了那些事情

1. 在内存中创建一个新的对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性。
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。(一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建不走)

#### 6.手写一个new操作符

```javascript
function Student(name,age){
  this.name = name
  this.age = age
  // return {
  //   nameAge:`${this.name}:${this.age}`
  // }
}

function myNew(fnc,...rest){
   //传入的第一个参数 必须是构造函数
  if(typeof fnc !== 'function'){
    throw new Error('传入的第一个参数必须为function')
  }
  // new.target 指向直接被new执行的构造函数，这里 myNew.target = fnc 
  myNew.target = fnc
  // 1.创建一个新的对象  并且执行[[Prototype]]链接，将新对象内部的[[Prototype]]特性 指向构造函数的 原型对象上
  // Object.create() 创建一个新对象，使用现有的对象来作为新创建对象的原型
  const obj = Object.create(fnc.prototype)
  // 构造函数内部的this被赋值为这个新对象（即this指向新对象），执行 构造函数内部的代码（给新对象添加属性）
  // 一般情况下 构造函数没有返回值，result 为空 ，则返回 刚创建的对象
  // 构造函数有返回值，且为非空对象(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，就返回该对象
  const result = fnc.apply(obj,rest)
  const isObject = typeof result === 'object' && result !== null
  const isFunction = typeof result === 'function'
  if(isObject || isFunction){
    return result
  }
  return obj
}

function myNew(fnc,...rest){
  if(typeof fnc !== 'function'){
    throw new Error('传入的第一个参数必须为function')
  }
  myNew.target = fnc
  // 如果不用 Object.create(), 就要将步骤拆开
  // 1. 创建新对象
  const obj = new Object()
  // 2. 将新对象的 [[Prototype]]特性 指向 构造函数的原型对象上
  obj.__proto__ = fnc.prototype
  const result = fnc.apply(obj,rest)
  const isObject = typeof result === 'object' && result !== null
  const isFunction = typeof result === 'function'
  if(isObject || isFunction){
    return result
  }
  return obj
}
```

#### 7.原型链

> 原型链是实现继承的主要方式。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。每个构造函数都有一个prototype属性，指向原型对象。原型对象都包含一个指向构造函数的constructor属性。该原型对象又是另一个类型的实例？就意味着这个原型本身有一个内部指针指向另一个原型，以此类推，在实例和原型之间构造了一个 链条形式（原型链）。

![img](https://picx.zhimg.com/e83bca5f1d1e6bf359d1f75727968c11_r.jpg?source=1940ef5c)

​																				               	***原型链关系图***



```javascript
function Foo(){}
const f1 = new Foo()
console.log(f1.__proto__ === Foo.prototype) // true    //实例对象的_proto__属性指向 生成该实例的 构造函数的原型对象
console.log(f1.constructor === Foo)  // true           //实例对象的constructor属性 指向 生成该实例的 构造函数 本身
console.log(Foo.prototype.__proto__ === Object.prototype) // true // Foo.prototype 也可以看成一个对象，它的__proto__ 属性 指向 构造函数Object的原型对象（Object.prototype）
console.log(Foo.prototype.constructor === Foo)  // true   // Foo.prototype 也可以看成一个对象,它的constructor属性指向 Foo 构造函数本身
console.log(Object.prototype.__proto__ === null)  // true   // Object.prototype 也可以看成一个对象，他的__proto__属性值为 null，表示原型链 顶端
// f1 -(__proto__)-> Foo.prototype -(__proto__)-> Object.prototype -(__proto__)-> null  //这条原型链结束

console.log(Foo.__proto__ === Function.prototype) // true  //  当把函数当成对象的时候，函数也有__proto__属性，并且生成它的函数就是Function
console.log(Function.prototype.__proto__ === Object.prototype) // true  //Function.prototype 也可以看成一个对象，它的__proto__属性指向 构造函数Object的原型对象（Object.prototype）

// Foo -(__proto__)->Function.prototype -(__proto__)-> Object.prototype -(__proto__)-> null  //这条原型链结束
```

#### 8.继承

##### （一）原型链继承

> 原型链继承（**prototype模式**）是将 **子构造函数**的原型对象，指向 ***父构造函数***生成的实例上，通过原型链，**子构造函数**生成的实例 可以访问到 **父构造函数**中的属性和方法。

```javascript
  function Parent() {
    this.name = "parent1";
    this.play = [1, 2, 3];
  }
  Parent.prototype.sayHi = function () {
    console.log(`Hi!,${this.type}`);
  };
  Parent.prototype.work = "保安";
  function Child() {
    this.type = "child";
  }
  const parent1 = new Parent()
  console.log("🚀 ~ file: index.vue:48 ~ temPrototypeChainInherite ~ parent1:", parent1)
  // 将 父构造函数的 实例 当成 子构造函数的 原型对象
  Child.prototype = new Parent();
  // 保持继承链的正确 将 子构造函数的 constructor属性 指向 子构造函数本身
  Child.prototype.constructor = Child;
```

打印parent1，结果如下：

![image-20230222103712547](https://wang-picture-bed.oss-cn-hangzhou.aliyuncs.com/picture_bed/image-20230222103712547.png)

**原型链的问题：**原型链虽然是实现继承的强大工具，但它也有问题。主要问题出现在原型中包含引用值的时候。原型中包含的引用值会在虽有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个构造函数的实例。这意味着原先的实例属性摇身一变成为了原型属性。**举个例子（接着上面的案例）**

```javascript
const child1 = new Child()
const child2 = new Child()
console.log(child1)
console.log(child2)
// 实例child1 和 child2 由Child构造函数 生成，拥有独立的 type属性，他们的[[Prototype]]（__proto__）特性指向 原型对象（new Parent()）,Parent构造函数生成的实例 有 name 和 play 属性（都当作 子构造函数的原型对象属性）
```

![image-20230222113354271](https://wang-picture-bed.oss-cn-hangzhou.aliyuncs.com/picture_bed/image-20230222113354271.png)

```javascript
child1.age = 30
child1.play.push(4)
child1.name = "child1"
child1.type = 'newChild'
// 虽然可以通过实例 读取原型对象上的值，但是不可能通过实例重写这些值。如果在实例上添加了一个与原型对象中同名的属性，那就会在实例上创建这个属性，这个属性就会遮住原型对象上的属性。（如 child1 中的type 属性，虽然改写了，只是在 child1 实例上创建了这个type属性，但是没影响原型对象内 type属性的值）

// 但对于引用数据类型  child1.play.push(4) 该操作 会直接影响 子构造函数 的原型对象的 play属性，导致 由子构造函数生成的所有实例  访问 子构造函数的原型对象 的 play属性都发生了变化
console.log(child1)
console.log(child2)
```

![image-20230222114505622](https://wang-picture-bed.oss-cn-hangzhou.aliyuncs.com/picture_bed/image-20230222114505622.png)

**总结：原型链继承缺点**

- 子构造函数的原型对象 变成了 父构造函数的实例. 乌鸦变凤凰  实例属性 摇身变成了 原型属性
- 原型是所有实例共享的，通过实例对原型上引用属性进行修改时，会影响到每个实例上
- 构造函数在实例化时，不能给父构造函数传参

##### （二）盗用构造函数

> 为了解决原型包含 引用类型 导致的继承问题，通过 call/apply在子构造函数内执行 父构造函数（将父构造函数内的this 指向 子构造函数）。通过盗用构造函数的形式实现继承

```javascript
  const Parent = function (name) {
    this.name = name;
    this.colors = ["red", "green", "blue"];
    this.getName = function () {
      console.log(`I am ${this.name}`);
    };
  };
  Parent.prototype.sayHi = function () {
    console.log(`Hi!,good son`);
  };
  Parent.prototype.address = "妖皇星";
  const Child = function (type, name) {
    // 最好先调用父构造函数，之后再添加子构造函数属性。以免属性被覆盖
    Parent.call(this, name);
    this.type = type;
  };

const parent = new Parent('父构造函数')

const child = new Child('子构造函数','父构造函数')

console.log(child.__proto__ === Parent.prototype)  // false  child实例 原型链 不指向 父构造函数Parent的原型对象

console.log(child.address)  // undefined  由上行说明可以看出 由于 address属性是挂载在 Parent.prototype对象下的，但是 child实例 原型链不指向 Parent.prototype , 当然 child1.address 也就没有对应值了。
child.sayHi()  // 同上， child.sayHi() 方法 也会报错  child.sayHi is not a function
```

由此可见，要想子构造函数 能继承父构造函数的方法，就不能将方法 挂载到 父构造函数的原型对象内，只能定义在父构造函数内（这样会导致由子构造函数生成实例时，每个实例都会创建一次 父构造函数内的方法）

接着往下看，由Child构造函数生成2个实例，打印看下结果

```javascript
  const child1 = new Child("悟饭", "悟空");
  const child2 = new Child("犬夜叉", "犬大将");
  console.log("🚀 ~ file: index.vue:124 ~ stealConstructor ~ child1:", child1)
  console.log("🚀 ~ file: index.vue:122 ~ stealConstructor ~ child2:", child2)
```

<img src="https://wang-picture-bed.oss-cn-hangzhou.aliyuncs.com/picture_bed/image-20230222162439407.png" alt="image-20230222162439407" style="zoom: 200%;" />

父构造函数中的属性 就会当成 子构造函数生成的实例 的 自有属性了。这样的话，改变child1 实例中的 引用类型属性 不会影响其他实例属性。

```javascript
child1.colors.push('yellow')
console.log("🚀 ~ file: index.vue:124 ~ stealConstructor ~ child1:", child1)
console.log("🚀 ~ file: index.vue:122 ~ stealConstructor ~ child2:", child2)
```

![image-20230224110218980](img/image-20230224110218980.png)

**总结：原型链继承优缺点**

1. 优点
   - 解决了 原型链继承的弊端（修改某个实例上的引用属性，不会影响到其他实例）
   - 可以在子构造函数中给父构造函数传参
2. 缺点
   - 只能继承父构造函数的实例属性和方法，不能继承父构造函数原型属性上的属性和方法  即 子构造函数的实例 原型链上指不到 父构造函数的prototype
   - 方法都在构造函数中定义了，每次创建实例都会创建一遍方法，函数没有复用

##### （三）组合继承

> 组合继承：原型链继承 + 盗用构造函数继承，将两者的优点集中了起来，基本的思路是使用原型链继承 原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```javascript
  const Parent = function (name) {
    this.name = name;
    this.colors = ["red", "green", "blue"];
    this.getName = function () {
      console.log(`I am ${this.name}`);
    };
  };
  Parent.prototype.sayHi = function () {
    console.log(`Hi!,good son`);
  };
  Parent.prototype.address = "妖皇星";
  // 盗用构造函数
  const Child = function (type, name) {
    Parent.call(this, name);
    this.type = type;
  };
  // 原型链继承
  Child.prototype = new Parent();
  // 校正构造函数   Child的原型对象的 constructor 属性 指向Child构造函数本身
  Child.prototype.constructor = Child;


const parent = new Parent('父构造函数')

const child = new Child('子构造函数','父构造函数')

console.log(child.__proto__ === Parent.prototype)  // false  child实例 原型链 不指向 父构造函数Parent的原型对象
console.log(child.__proto__.__proto__ === Parent.prototype) // true child实例的[[Prototype]]特性 指向 Parent构造函数生成的实例，该实例的[[Prototype]]特性指向Parent构造函数的原型对象 （Parent.prototype）
```

![image-20230224135158079](img/image-20230224135158079.png)

```javascript
  const child1 = new Child("犬夜叉", "犬大将");
  const child2 = new Child("悟饭", "悟空");
  child2.address = "七龙珠";
  console.log( "🚀 ~ file: index.vue ~ line 151 ~ temCompositionInherite ~ child1", child1);
  console.log( "🚀 ~ file: index.vue ~ line 153 ~ temCompositionInherite ~ child2", child2);
```

![image-20230224135918631](img/image-20230224135918631.png)

在调用子构造函数生成 子实例时，通过 call绑定 调用了一次 父构造函数，将父构造函数内的方法和属性 继承为  子实例自身属性。又将 子构造函数的原型对象指向 父构造函数生成的实例，导致 子构造函数的原型对象里 有和子实例属性、方法重名的， 虽然访问时会被子构造函数的同名实例属性所覆盖。

注意：其实在构造函数内应避免 定义方法。

```javascript
  console.log(child1 instanceof Child, "child1 instanceof Child");  // true  Child.prototype 在 child1实例的原型链上
  console.log(child1 instanceof Parent, "child1 instanceof Parent"); // true  Parent.prototype 在 child1实例的原型链上
  console.log(child1 instanceof Object, "child1 instanceof Object"); // true  Object.prototype 在 child1实例的原型链上
  // isPrototypeOf() 是 Object函数（类）的下的一个方法，用于判断当前对象是否为另外一个对象的原型，如果是就返回 true，否则就返回 false。
  console.log(Child.isPrototypeOf(child1), "Child.isPrototypeOf(child1)"); // false
  console.log(Child.prototype.isPrototypeOf(child1), "Child.prototype.isPrototypeOf(child1)"); // true 
  console.log(Parent.prototype.isPrototypeOf(child1), "Parent.prototype.isPrototypeOf(child1)"); // true 
  console.log( Object.prototype.isPrototypeOf(child1), "Object.prototype.isPrototypeOf(child1)"); // true 
```

**总结：组合继承缺点**

- 父构造函数的实例属性 依然会存在于 子构造函数的原型上，虽然访问时会被子构造函数的同名实例属性所覆盖
- 继承过程中调用了两次 父构造函数，一次是 call（new 子构造函数）

##### （四）原型式继承

> 这种方法并没有使用严格意义上的构造函数，思想是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```javascript
  // 在 MyCreat 函数内部，先创建了一个临时性的构造函数，然后将传入的对象 作为这个构造函数的原型，最后返回这个临时构造函数的 一个新实例，本质上 MyCreat()就是完成了一次浅复制
  const MyCreat = function (o) {
    function Fn() {}
    Fn.prototype = o;
    Fn.prototype.constructor = Fn;
    return new Fn();
  };
  const Person = {
    name: "小王",
    friends: ["张三", "李四"],
  };
  const p1 = MyCreat(Person);
  const p2 = MyCreat(Person);
  console.log("🚀 ~ file: index.vue ~ line 61 ~ temPrototypeInherite ~ p1", p1);
  console.log("🚀 ~ file: index.vue ~ line 62 ~ temPrototypeInherite ~ p2", p2);
  console.log(p1.__proto__ === Person);  // true
```

![image-20230224173423704](img/image-20230224173423704.png)

```javascript
p1.name = "p1";
console.log("🚀 ~ file: index.vue ~ line 61 ~ temPrototypeInherite ~ p1", p1, p1.name);
console.log("🚀 ~ file: index.vue ~ line 62 ~ temPrototypeInherite ~ p2", p2);

debugger
p1.firends.push('小p')
console.log("🚀 ~ file: index.vue ~ line 63 ~ temPrototypeInherite ~ p1", p1);
console.log("🚀 ~ file: index.vue ~ line 64 ~ temPrototypeInherite ~ p2", p2);
```

![image-20230224173627397](img/image-20230224173627397.png)

![image-20230224174748213](C:\pro\demo\wangdi9588.github.io\docs\guide\img\image-20230224174748213.png)

原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但是属性中包含的引用值始终会在相关对象间共享，跟使用原型模式一样的。

> **ECMAScript5**通过新增**Object.create()**方法规范化了原型式继承，这个方法接收两个参数：一个用作新对象原型的对象和为新对象定义属性的对象。当只有一个参数时，`Objece.create()`与上面的MyCreat方法效果一样：

```javascript
let Person = {
    name:'小王',
    friends:['张三', '李四']
}
let p1 = Object.create(Person)
p1.name = '小张'
p1.friends.push('小张')
console.log(p1.name);   //小张
console.log(p1.friends);    //[ '张三', '李四', '小张' ]

let p2 = Object.create(Person)
p2.friends.push('小李')
console.log(p2.name);   //小王
console.log(p2.friends);    //[ '张三', '李四', '小张', '小李' ]
```

其实`Object.create()`的原理用下面一段代码就能说明：

```javascript
let p1 = {}
Object.setPrototypeOf(p1, Person)
```

就是把对象p1的内部属性[[portotype]]设置成了Person。可以验证一下：

```javascript
let Person = {
    name:'小王',
    friends:['张三', '李四']
}
let p1 = Object.create(Person)

console.log(Object.getPrototypeOf(p1) === Person);  //true
console.log(p1.__proto__ === Person);  //true
```

`Object.create()`的第二个参数与`Object.defineProperties()`的第二个参数一样。以这种方式新增的属性会遮蔽原型对象(也就是第一个参数)上面的属性:

```javascript
let Person = {
    name:'小王',
    friends:['张三', '李四']
}
let p1 = Object.create(Person, {
    name:{
        value:'小张',
        enumerable:true,
        writable:true,
        configurable:true
    }
})
console.log(p1.name);   //小张
```

##### （五）寄生式继承

> 寄生式继承是与原型式继承紧密相关的一种思路，即创建一个仅用于封装继承函数过程的函数，该函数在内部以某种方式来增强对象，最后返回对象

```javascript
 const MyCreat = function (o) {
    function Fn() {}
    Fn.prototype = o;
    Fn.prototype.constructor = Fn;
    return new Fn();
  };

function createObj(original){
    const createdTarget = MyCreat(original)
    createdTarget.sayHi = function (){
        console.log('hi!')
    }
    return createdTarget
}

const person = {
    name: 'alice',
    friends: ['Sherly', 'Taissy', 'Vant']
}
const child = createObj(person)
child.sayHi() // hi!
console.log(child.friends)  // ['Sherly', 'Taissy', 'Vant']
child.friends.push('hany')
console.log(child.friends)  // ['Sherly', 'Taissy', 'Vant', 'hany']
console.log(person.friends) // ['Sherly', 'Taissy', 'Vant', 'hany']
```

**总结：寄生式继承缺点**

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的风险。
- 无法传递参数

##### （六）寄生式组合继承

```javascript
function inheritPrototype(child, parent){
    const prototype = MyCreat(parent.prototype) // 创建父类原型的 浅复制
    prototype.constructor = child
    child.prototype = prototype
}
function Parent(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    console.log(this.name)
};

function Child(name, age){
    Parent.call(this, name);
    this.age = age;
}
inheritPrototype(Child, Parent)
```



## 三、call、apply、bind方法





## 四、将类数组转为数组的方法

#### 1.slice方法

```javascript
const arr = Array.prototype.slice.call(arguments)
const otherArr = [].slice.call(arguments)
```

#### 2.Array.from方法

```javascript
const arr = Array.from(arguments)
```

#### 3.扩展运算符

```javascript
const arr = [...arguments]
```

## 五、Array.prototype.slice.call() & Array.from()的应用和理解

> Array.prototype.slice.call() 可将类数组(arguments,NodeList)，字符串(String)转换成数组。
>
> Array.from() 可将类数组(arguments,NodeList)，可迭代对象(Set,Map)，字符串(String)转换成数组。