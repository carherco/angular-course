# Subject

- Subjects are both observer and observable.

```ts
var subject = new Rx.Subject();

//We can subscribe observers to subjects
subject.subscribe(v => console.log('consumer A: ' + v));
subject.subscribe(v => console.log('consumer B: ' + v));

var observable = Rx.Observable.from([0, 1]);
//But also we can subscribe a subject to an observable
observable.subscribe(subject);

/* Prints */
// Consumer A: 0
// Consumer B: 0
// Consumer A: 1
// Consumer B: 1
```

That is the same as

```ts
var observable = Rx.Observable.from([0, 1]).publish();
observable.subscribe(v => console.log('consumer A: ' + v));
observable.subscribe(v => console.log('consumer B: ' + v));
observable.connect();

/* Prints */
// Consumer A: 0
// Consumer B: 0
// Consumer A: 1
// Consumer B: 1
```

- Subjects are HOT.

- They have methods to emit values, cause an error or send a complete signal: **.next()**, **.error()** and **.complete()**.

```ts
var subject = new Rx.Subject();  

subject.next(1);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)  
});

subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)  // output current value 2, then new values on `next` triggers
});

subject.next(3);

/* Prints */
// observerA: 2
// observerA: 3
// observerB: 3
```

## ReplaySubject

Same as Subject but ReplaySubject will replay the last event emitted if you subscribe late to the ReplaySubject.

```ts
var subject = new Rx.ReplaySubject();  

subject.next(1);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)  
});

subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)  // output current value 2, then new values on `next` triggers
});

subject.next(3);

/* Prints */
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

## BehaviourSubject

It is like ReplaySubject, but we the constructor accepts an initial value.

```ts
var subject = new Rx.BehaviorSubject(0);

subject.subscribe({
  next: (v) => console.log('observer0: ' + v) 
});

subject.next(1);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v) 
});

subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v) 
});

subject.next(3);

/* Prints */
// observer0: 0
// observer0: 1
// observerA: 1
// observer0: 2
// observerA: 2
// observerB: 2
// observer0: 3
// observerA: 3
// observerB: 3
```

### To Use Subject Or Not To Use Subject

http://davesexton.com/blog/post/To-Use-Subject-Or-Not-To-Use-Subject.aspx