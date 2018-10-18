# Directivas

There are 3 types of directives in angular:

- Component directives.
- Structural directives.
- Attribute directives.

## Component directives

Angular components are specialized directives that use the @Component decorator, which
extends from the decorator @Directive. Components are associated with a template and a stylesheet, while regular directives not.

Component directives allow you to include a component in the HTML (template) of another component. We can say that a component is a directive with a template.

A component adds HTML to the DOM, a directive modifies the DOM of an element.

```jinja+html
<div>
    <app-calculator></app-calculator>
</div>
```

## Structural directives

Structural directives alter the structure of the DOM, adding, eliminating or manipulating DOM elements. They are easy to recognize, an asterisk (\ *) precedes the attribute name of the directive.

It is important to keep in mind that an element can only apply one structural directive.

### ngIf

Adds or deletes an element from the DOM based on a condition.

```jinja+html
<div *ngIf="hero" class="name">{{hero.name}}</div>
```

### ngFor

Repeats a template for each item in a list.

```jinja+html
<ul>
  <li *ngFor="let hero of heroes">{{hero.name}}</li>
</ul>
```

Within the \* ngFor there are 5 local variables:

- index: number: The index of the current element.
- first: boolean: True when the current item is the first.
- last: boolean: True when the current item is the last one.
- even: boolean: True when the index of the current item is even.
- odd: boolean: True when the index of the current item is odd.

How to use:

```jinja+html
<div *ngFor="let hero of heroes; let i=index; let odd=odd" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>
```

### NgSwitch

A set of directives that allow switching between alternative views.

```jinja+html
<div [ngSwitch]="type">
    <app-text *ngSwitchCase="'text'" ></app-texto>
    <app-image *ngSwitchCase="'image'"></app-image>
    <app-tree *ngSwitchCase="'tree'"></app-tree>
</div>  
```

CAUTION: Only one directive per element can be set. The following code will throw an error:

```jinja+html
<div>
  Choose your favorite hero
  (<label><input type="checkbox" checked (change)="showSad = !showSad">hide sad heroes</label>).
</div>
<select [(ngModel)]="hero">
  <option *ngFor="let h of heroes" *ngIf="showSad || h.emotion !== 'sad'" [ngValue]="h" >{{h.name}} ({{h.emotion}})</option>
</select>
```

### Ng-Container

There is the &lt;ng-container> tag that is not introduced in the DOM and that may be useful when we want to apply more than one structural directive on the same element as in the above example.

The solution could be something like this:

```jinja+html
<div>
  Choose your favorite hero
  (<label><input type="checkbox" checked (change)="showSad = !showSad">hide sad heroes</label>).
</div>
<select [(ngModel)]="hero">
  <ng-container *ngFor="let h of heroes">
    <ng-container *ngIf="showSad || h.emotion !== 'sad'">
      <option [ngValue]="h">{{h.name}} ({{h.emotion}})</option>
    </ng-container>
  </ng-container>
</select>
```

## Attribute directives

Attribute directives change the appearance or behavior of an element, component or other directive.

Attribute directives are used as if they were attributes of the HTML elements.

Multiple attribute directives can be applied to the same element.

Examples of angular attribute directives:

- NgClass
- NgModel
- NgForm

Examples:

```jinja+html
<div [class.my-class1]="step==1" [class.my-class2]="step==2"></div>
<div [ngClass]="{'my-class1': step==1,'my-class2': step==2}"></div>
<div [ngClass]="{1:'my-class1',2:'my-class2',3:'my-class3'}[step]"></div>
<div [ngClass]="(step==1)?'my-class1':'my-class2'"></div>
```

We will be seeing many attribute directives during the course.

### Custom attribute directives

Building an attribute directive is very simple. Just create a class decorated with @Directive where the selector that identifies the directive. This class will define the behavior of the directive.

```typescript
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(el: ElementRef) {}
}
```

Do not forget to declare the directive in the *declarations* metadata of the module.

Instead of creating it by hand, we can generate it with the Angular CLI:

> ng generate directive highlight

When this directive is used, Angular will build the class associated and will pass to the constructor an **ElementRef** object that is the element on which the directive is being applied.

That is, for the previous example, when angular finds *appHighlight* in an HTML, it will apply the directive defined in the *HighlightDirective* class.

Let's make the directive change the background color of the element on which it is applied.

```jinja+html
<p appHighlight>Highlight me!</p>
```

```typescript
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

This causes the element on which the directive is applied to have yellow background color.

#### The @HostListener decorator

The @HostListener decorator allows the directive to respond to events that occur in the element:

```typescript
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight("yellow");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

#### The @Input decorator

The @Input decorator allows us to pass variables to the directive.

Let's make an example in which when applying the directive _appHighlight_ to an element, we have the possibility to choose the color

```jinja+html
<p appHighlight [highlightColor]="color">Some text</p>
```

```typescript
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input() highlightColor: string;

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight(this.highlightColor || "red");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

The directive can be abbreviated if the @Input alias is used.

```jinja+html
<p [appHighlight]="color">Some text</p>
```

```typescript
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input("appHighlight") highlightColor: string;

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight(this.highlightColor || "red");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

[Índice](index.md)
