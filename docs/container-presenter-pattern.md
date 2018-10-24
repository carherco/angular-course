# Container-Presenter pattern

The container-presenter pattern (aka smart-dumb pattern) fits very well with Angular change detection strategy *onPush* and with Redux pattern.

This patter consists in separate our components in container components and presenter components.

For example, the template of the  basic-crud component is like this

```html
<h2>Heroes manager</h2>

<h3>Add a hero to the list</h3>
<form class="form-inline">
  <div class="form-group">
    <label for="nombre">Nombre:</label>
    <input type="text" class="form-control" id="nombre" name="name" [(ngModel)]="newHero.name" placeholder="Escribe el nombre...">
  </div>
  <div class="form-group">
    <select [(ngModel)]="newHero.emotion" name="emotion">
    <option *ngFor="let emotion of emotions" [value]="emotion">{{emotion}}</option>
  </select>
  </div>
  <button type="button" class="btn btn-primary" (click)="add()">Add</button>
</form>

<div class="row">

  <div class="col-md-6">
    <h3>Lista de héroes</h3>
    <input type="checkbox" [(ngModel)]="hide_sad"> Hide sad heroes
    <table class="table table-striped">
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Estado de ánimo</th>
        <th></th>
      </tr>
      <ng-container *ngFor="let hero of heroes; let index=index; let odd=odd;">
        <tr *ngIf="!ocultar_tristes || (hide_sad && hero.emotion!='sad') "
            [class.selected]="hero === selectedHero"
            class="heroe_{{hero.emotion}}"
            [ngClass]="{'seleccionado': selectedHero == hero}"
            [style.font-size]="(selectedHero == hero)?'20px':''"
            (click)="onSelect(hero)">
          <td>{{hero.id}}</td>
          <td>{{hero.name}}</td>
          <td>{{hero.emotion}}</td>
          <td><button class="btn btn-danger" (click)="delete(index)">X</button></td>
        </tr>
      </ng-container>
    </table>
  </div>

  <div *ngIf="selectedHero" class="col-md-6">
    <h3>Datos del héroe {{selectedHero.name}}</h3>
    <div><label>Id: </label>{{selectedHero.id}}</div>
    <div>
      <label>Nombre: </label>
      <input [(ngModel)]="selectedHero.name" placeholder="name"/>
    </div>
    <div>
      <select [(ngModel)]="selectedHero.emotion">
        <option *ngFor="let emotion of emotions">{{emotion}}</option>
      </select>
    </div>
  </div>

</div>
```

And the typescript like this:

```ts
import { Component, OnInit } from '@angular/core';
import { HEROES } from '../../data/mock-heroes';
import { Hero } from '../../model/hero';

@Component({
  selector: 'app-crud-basico',
  templateUrl: './crud-basico.component.html',
  styleUrls: ['./crud-basico.component.css']
})
export class CrudBasicoComponent implements OnInit {

  title = 'CRUD BÁSICO';
  heroes = HEROES;
  emotions = ['','happy','sad','confused'];
  lastId = 20;
  hide_sad: boolean = false;
  newHero: Hero;
  selectedHero: Hero;

  constructor() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(): void {
    console.log(this.newHero);
    this.heroes.push(this.newHero);
    this.resetNewHero();
    this.lastId = this.lastId +1;
  }

  resetNewHero() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  delete(index) {
    this.heroes.splice(index, 1);

    // let nuevoArray = [];
    // for (let h of this.heroes) {
    //   if(h.id !== heroe.id) {
    //     nuevoArray.push(h);
    //   }
    // }
    // this.heroes = nuevoArray;
  }

}
```

The same component manages data and presents it.

The container-presenter pattern consist on split this component in one container component and one or more presenters.

The container will manage data, but do not present anything. 

The presenters will present data, but do not manage it.

## The container component

The container template could be something like this:

```html
<h2>Heroes manager</h2>

<app-heroes-add-presenter></app-heroes-add-presenter>

<div class="row">

  <app-heroes-list-presenter [heroes]="heroes"></app-heroes-list-presenter>

  <app-heroes-edit-presenter *ngIf="selectedHero" class="col-md-3" [hero]="selectedHero" (onChildDeleted)="onDeleted($event)"></app-heroes-edit-presenter>

</div>
```

This component knows how to get the list of heroes, how to add a hero to the list... but does not decide how to present the list of heroes or how to present the add form.

## The presenter components

Presenter components know how to present data in the screen. Let's take a look for example to *app-heroes-edit-presenter* html:

```html
<h3>Detail of {{hero.name}}</h3>
<div><label>Id: </label>{{hero.id}}</div>
<div>
  <label>Name: </label>
  <input [(ngModel)]="hero.name" placeholder="name"/>
</div>
<button class="btn btn-danger" (click)="delete()">Delete</button>
```

However, this component does not know how to get de hero to be presented nor how to delete it from the list of heroes. In fact, if we take a look to the typescript, we can see that it has almost no logic inside.

```ts
@Component({
  selector: 'app-heroes-edit-presenter',
  templateUrl: './heroes-edit-presenter.component.html',
  styleUrls: ['./heroes-edit-presenter.component.css']
})
export class HeroesEditPresenterComponent implements OnInit {

  @Input() hero: Hero;
  @Output() onChildDeleted = new EventEmitter<Hero>();
  
  constructor() { }

  ngOnInit() { }

  delete() {
    this.onChildDeleted.emit(this.hero);
  }
}
```

That's why this components are also known as smart-dumb components. Presenter components are dumb. They receive data through the @Input decorator, and emit events through the @Output decorator.

The container component is the smart component. It knows how to get and process the data comunicates whith the presenter components through @Input and @Output. It could be considerer as an interface between the model and the presenters.



