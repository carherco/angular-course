# Change detection

Angular uses internally the **zone.js** library to handle change detection.

## Default change detection

By default Angular follows a dirty-checking strategy in which whenever something occurs that is likely to cause a change (events, timers, promises, observables ...) it checks every binded data in depth (property of each object of each array ...) to see whether the current values ​​are the same as the previous ones. If it detects a change, it re-renders the views.

It is also called "pulling" because we are continuously (events, timers ...) asking Angular to make checks of changes.

## ChangeDetectionStrategy.onPush

With this strategy, Angular assumes that all our objects are **Immutable**. That is, the values ​​of their properties will NOT change.

Angular waits for the programmer to tell him he has to detect changes.

Exceptions:

- A change in a REFERENCE @Input. (change in the reference, not in the value, since angular will consider that the objects are immutable)
- An event of the DOM or associated with an @Output
- An observable issue a new value

According to comments Victor Savkin (Angular's core contributor) in his blog:

```
When using OnPush detectors, then the framework will check for OnPush component when any of its input properties changes, when it is an event, or when an Observable fires an event
```

The detection of the manual change is launched:

- Explicitly by the programmer through: ChangeDetectorRef.detectChanges()
- Implicitly when using the Async pipe in the view

Note: The Async pipe:

- It unsubscribes when the component is destroyed
- Automatically calls ChangeDetectorRef.detectChanges()

Implications:

- New references (new objects) must be passed to the children components.

**ChangeDetectionStrategy.onPush** is set as metadata for a component.

```ts
@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  // ...
}
```

A component with *ChangeDetectionStrategy.OnPush* makes him and his children (except the router-outlet) work with the same strategy.

## Cloning techniques

Do not clone primitive data (number, string, boolean ...) because when changing its value, it is considered with @Input that the reference has changed.

### Simple cloning with the spread operator

To change a property value and end up with a cloned object, we can do the following:

```js
target = {...original}
target.name = 'xxxx';
target.age = '7';
```

or in a single instruction:

```js
target = {...original, name: 'xxxx', age: 7}
```

This simple cloning method does not handle deleting properties or cloning methods.

### Complex cloning

For more complex clones, we should use specialized libraries that perform efficient clones (for example: Immutablejs).

Official documentation: (https://angular.io/api/core/ChangeDetectorRef)
