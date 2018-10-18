# Template reference variables

To declare a *template reference variable*, the pad is used, followed by the identifier.

```html
<input #box>
<p>{{box.value}}</p>
```

A template reference variable represents the element in which it has been declared.

Template reference variables have the scope restricted to the template.

```html
<input #box>
<p>{{box.value}}</p>
```

To see the example above working, we need a little hack. Let's bind to an event.

```html
<input #box (keyup)="0">
<p>{{box.value}}</p>
```

## Exercise

Using *Template reference variables*, make a list of Heroes and a text box to add heroes with an add button.

Heroes will be added when the user clicks on the button, when presses the enter key or when clicks outside the box.

A hero will be in this case only a string, instead of an object.

If the box is empty, no hero will be added to the list.

The code of the starting component is the following:


```typescript
@Component({
  selector: 'app-ejercicio-key-up',
  template: `
    <input>
    <button>Add</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class EjercicioKeyUp {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  
}
```

### Solution

```typescript
@Component({
  selector: 'app-ejercicio-key-up',
  template: `
    <input #newHero
      (keyup.enter)="addHero(newHero.value); newHero.value='' "
      (blur)="addHero(newHero.value); newHero.value='' ">

    <button (click)="addHero(newHero.value)">Add</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class EjercicioKeyUp {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
    }
  }
}
```

## How to access a template reference variable from the component

If we want or need to gain access from the component to a template reference variable, we will use the decorator **@ViewChild**:

```typescript
@Component({
  selector: 'key-up5',
  template: `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">

    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v5 {
  @ViewChild('box') box: ElementRef
  
  ...
  
}
```

[Índice](index.md)
