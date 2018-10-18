# Template syntax and data binding

The component "communicates" with its template through what is called **data-binding**.



Desde la plantilla se puede acceder a cualquier propiedad pública del componente. (Recordemos que por defecto las propiedades de una clase son públicas)

## One way data binding (from component to template)

From the template you can access any public property of the component.

It is used for:

- Interpolation
- Properties
- Attributes
- Classes
- Styles


```jinja+html
  <h1>{{expression}}</h1>
  <img src="{{expression}}" />
  <img [src]="expression" />
  <img bind-src="expression" />
```

The expressions can be just a variable, or an operation, or a call to a function ...

Interpolation is indicated with {{ }}:

```jinja+html
  <div>The result of {{varA}} + {{varB}} is {{varA + varB}}</div>
  <div>The result of {{varA}} + {{varB}} is {{add(varA,varB)}}</div>
  <div>The person is called {{persona.nombre}}</div>
```

The binding in properties, attributes, classes, styles ... is done with [] or with the prefix bind-:

```jinja+html
  <!-- Atributo (HTML) -->
  <option [selected]="isCarSelected" value="BMW">BMW</option>
  <div [class]="miClase">This is an element with a dynamic class</div>

  <!-- Propiedad (DOM) -->
  <div [hidden]="isHidden">This element can be hiden or not</div>

  <!-- Clase -->
  <div [class.special]="isSpecial">This element can have the class 'special' or not</div>

  <!-- Estilos -->
  <p [style.color]=”miColor”>This paragraph has a dynamic color</p>
```

NOTA: attributes vs. properties: https://angular.io/guide/template-syntax#html-attribute-vs-dom-property

Expressions that have *collateral effects* are prohibited as expressions in angular templates:

- assignments (=, +=, -=, ...)
- The *new* operator
- chaining expressions with ; or ,
- increment or decrement operators (++ y --)

Neither are valid in angular the operators | and &.

On the other hand, angular has some own operators: | (pipe operator) , ? (safe navigation operator) , and ! (non-null assertion operator).

Expressions in templates can make a great application, or break it. The recommendations to generate expressions are:

- Do not cause side effects
- Quick to evaluate
- Simple
- Idempotent

## One way data binding (de la template al componente)

It is used for:

- Eventos

```jinja+html
  <button (click)="statement">Hello</button>
  <button on-click="statement">Hello</button>
```

A statement can be a call to a function, an assignment ...

```jinja+html
  <button (click)="send()">Hello</button>
  <button (click)="result = var1 + var2; makeSomething(result);">Hello</button>
```

In the context of the event, an **$event** variable is created with information about the event.

```jinja+html
  <input (keyUp)="onKeyUp($event)">
```

## Simulating two-way data binding

Sometimes we need the linking of data to occur simultaneously from the component to the template and vice versa. The typical case is that of the forms elements.

In this code, when the user types in the input, although the
variable person.name is interpolated, the value of the input is not updated.

```jinja+html
  <input [value]="person.name"/>
  <p>{{person.name}}</p>
```

A solution to also update the interpolated variable would be the following:

```jinja+html
  <input [value]="persona.nombre" (keyup)="persona.nombre = $event.target.value"/>
  <p>{{persona.nombre}}</p>
```

But, this two-way binding operation is so common, that angular has a simpler way to do it.

## Angular two-way data binding

It is used in template-driven forms

```jinja+html
  <input [(ngModel)]="variable" />
  <input bindon-ngModel="variable" />
```

[()] is an "abbreviation" of:

```jinja+html
  <input [ngModel]="variable" (ngModelChange)="variable=$event.target.value"/>
```

which internally would more or less be equal to:

```jinja+html
  <input [value]="variable" (keyup)="variable=$event.target.value"/>
```

Note: To use *ngModel* we need to import **FormsModule**.

```typescript
//src/app/app.moudle.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
...

@NgModule({

  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ...
  ],
  providers: [
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Examples:

- click-me
- calculadora
- include &lt;click-me&gt; component several times

https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/

[Índice](index.md)
