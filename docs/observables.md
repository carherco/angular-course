# RxJS: Observables

Observables are based on two well-known programming patterns: the *Observer* pattern and the *Iterator* pattern. They are the basis of **Reactive Programming**. Angular includes the JavaScript library RxJS for reactive programming.

  An Observable is a mechanism created for representing data flows. In this way we should not think about arrays, mouse events, http calls to the server ..., but in something that groups them all, the Observable.

  When we want to work using reactive programming with a specific data type (for example, an array), there will be a method to transform that data into an Observable and to work with it in this way.

## Basic use and terminology

### Observables

An *observable* is an object that publishes data and offers a `subscribe()` function that is used to put *observers* to *observe*. When the observable has the data ready to be consumed, it passes that data to the observers subscribed to it so data can be processed.

The whole procedure is asynchronous, that is, obtaining the data stream occurs in the background. Only when they are ready are the functions associated with the observers executed.

### Observers

Observers are the elements that will observe the observables. Here is an Observer:

```javascript
  let observer = Rx.Observer.create(
    function onNext(x) { console.log('Next: ' + x); }, 
    function onError(err) { console.log('Error: ' + err); }, 
    function onCompleted() { console.log('Completed'); } 
  );
```

It's a little weird because in reality it's just an object with three methods that say what to do in the case that the Observable (our array, a call http ... any data flow) changes (onNext), issues an error (onError) or the flow is completed (onCompleted).

Only the first of the functions is mandatory. The other two are optional.

### Subscription to observables

Of course, all that will not work if we do not subscribe the Observer to the Observable.

```javascript
  let suscription = observable.suscribe(observer);
```

At any time, we can unsubscribe the observer.

```javascript
  suscription.unsuscribe();
```

En lugar de pasar un argumento con un objeto *Observer* al método subscribe() podemos pasarle un argumento con un objeto con tres funciones

Instead of passing an argument with an Observer object to the subscribe() method, we can pass an argument to it with an object with three functions

```javascript
let suscription = observable.subscribe({
  next(v){ /* procesamiento de v */},
  error(e){ /* procesamiento de e */ },
  complete(){/* completado el observable */}
  },
})
```

Or the most common, pass three arguments with the three funtions:

```javascript
let suscripcion = observable.subscribe(
  v => { /* procesamiento de v */}
  e => { /* procesamiento del error */},
  () => { /* completado*/ }
)
```

As an observer is only required to have the first function, we will often find calls to the subscribe method passing only one argument with the next() function.

```javascript
let suscripcion = observable.subscribe(v => { /* ... */})
```

And THIS is the basis of **Reactive Programming**.

Example at: cold-observables

### Hot observables vs. cold observables

Observables can be hot or cold.

#### Cold Observables

- One instance for each subscription.
- The observable begins at the time of subscription.
- Unsubscribe from the observable to free memory.

#### Hot Observables

A hot observable starts its broadcast when its **connect()** method is invoked:

```javascript
  const obsv = Observable.create( e => {...});
  ...
  obsv.connect();
```

But the observables that we create with the construction methods of observables (new, create, from, of ...) construct cold observables.
  
To convert a cold observable into a hot one, just invoke the method **publish()**

```javascript
  const obsv = Observable.create( e => {...}).publish();
  ...
  obsv.connect();
```

Subscribers can subscribe and unsubscribe without problems before invoking connect() or after invoking connect().
  
It's like arriving at a concert in before it starts, to get a good place, or being late and missing part of the concert. But the concert does not wait for the audience. 

  
http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html	 
http://rxmarbles.com/

### Operators

The real power of Observables is that the values they produce can be transformed by reactive operators that operate on the data stream. These operators are **pure functions** that enable a functional programming style without collateral effects. Operators can manipulate flow data, filter it, combine...

Example at: hero-search

## Observables in Angular

Angular uses observables of the RxJs library for the treatment of several asynchronous operations.

- EventEmiter in the communication from the child component to the parent (@Output)
- HttpClient
- Async Pipe, which subscribes to an observable and updates the value in the template as you receive data.
- Router events
- Router params
- Reactive forms

## Examples

### Creation of Observables

The `RxJS` library offers several ways to create observables:

From a data value with `of`:

```javascript
import { of } from "rxjs";
let observable = of("Hello, how are you?");
```

From an array with from `from`:

```javascript
import { from } from "rxjs";
let observable = from([1,2,3]);
```

With `interval` to create a numeric sequence:

```javascript
import { interval } from "rxjs";
let observable = interval(1000)
```

From a DOM event:

```javascript
import { fromEvent } from "rxjs";
let observable = fromEvent(document.getElementById('box'), "mousemove")
```

From an Ajax request:

```javascript
import { ajax } from 'rxjs/ajax';
let o1 = ajax('https://jsonplaceholder.typicode.com/albums')
```

With a custom algorith:

```javascript
import { Observable } from "rxjs"
let o1 = Observable.create( emmiter => {
      let n = 0
      setInterval(
        () => {
          n++
          if(n > 5){
            emmiter.complete()
          }else{
            emmiter.next('Emmiting number ' + n)
          }
        }, 1000)
    })
```

[Índice](index.md)
