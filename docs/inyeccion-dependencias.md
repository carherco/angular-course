# Dependency injection (DI)

Dependency injection is an object-oriented design pattern in which objects are supplied to a class instead of being the class itself who creates the objects. It is also known as IoC (Inversion of Control).

Let's see it in an example. Let's say we have a HeroService class that, in order to instantiate it, needs to receive an instance of an Http object in the constructor.

```typescript
export class HeroService {
  constructor (private http: Http) {}
}
```

Http is a class that requires instances of another two objects to instantiate it.

```typescript
export class Http {
    protected _backend: ConnectionBackend;
    protected _defaultOptions: RequestOptions;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions);
```

## Método tradicional

Without the dependency injection pattern, if I want an instance of HeroService I have to do the following:

```typescript
export class CrudBasicoComponent implements OnInit {

  private heroService;

  constructor() {
      backend = new ConnectionBackend();
      options = new RequestOptions();
      http = new Http(backend, options);
      this.heroService = new HeroService(http);
  }
```

Problems of this approach:

- Too many programming lines are needed to simply instantiate a single object.
- Knowledge of the classes and builders is needed to be able to instantiate them all.
- If I modify the HeroService constructor (to add another parameter, or to change it for another ...) I have to review ALL my application to change all the new HeroService() that I have.

## With dependency injection

If the dependency injection pattern is used, it is the *system* who is in charge of supplying the corresponding objects to each class.

Simply typing in the constructor the type of each variable, Angular will be responsible for instantiating all classes that are necessary

```typescript
export class CrudBasicoComponent implements OnInit {

  private heroService;

  constructor(heroService: HeroService) {
      this.heroService = heroService;
  }
```

Or thanks to constructor shorhand:

```typescript
export class CrudBasicoComponent implements OnInit {

  constructor(private heroService: HeroService) {
  }
```

With this pattern, all the problems mentioned above disappear.

[Índice](index.md)