# Lazy loading modules

Modules can be loaded all in the first download of the app or can be lazy loaded when they are needed.

We will create and configure some modules with the standard way and later we will choose some of them to be lazy loaded.

```
ng g m lazy1 --routing
ng g m lazy2 --routing
ng g m lazy3 --routing
ng g m lazy4 --routing
ng g m lazy5 --routing
ng g c lazy1 --module=lazy1
ng g c lazy2 --module=lazy2
ng g c lazy3 --module=lazy3
ng g c lazy4 --module=lazy4
ng g c lazy5 --module=lazy5
```

In our root Module:

```typescript
@NgModule({
  imports: [
    ...
    Lazy1Module
    Lazy2Module
    Lazy3Module
    Lazy4Module
    Lazy5Module
    ...
  ],
})
export class AppModule { }
```

In our root module routing:

```typescript
{ path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
{ path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
{ path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module'},
{ path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module'},
{ path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
```

In every child route:

```typescript
{ path: '', component: Lazy1Component },
```

And somewhere in our app:

```typescript
<li><a class="nav-link" routerLink="/lazy1" routerLinkActive="active">Access to lazy1 component</a></li>
```

We can inspect javascript files downloaded and check that all modules have been downloaded together.

## Lazy loading by demand

To configure a module to be lazy loaded, we just need to **remove** it from the *imports* section of our root module.

```typescript
@NgModule({
  imports: [
    ...
    Lazy1Module
    Lazy2Module
    Lazy5Module
    ...
  ],
})
export class AppModule { }
```

Now we can check that Lazy3Module and Lazy4Module are not downloaded with the rest of the modules. It's not until we try to navigate to one of this modules that the module will be downloaded.

To activate lazy loading in a module we need:

- Load the module in the path of the parent routing
- Define a default route in the child module
- Configure the router module of the lazy module with .forChild()
- DO NOT include the lazy module in the root module

## Lazy loading with preloading

The routing library offers two preloading strategies:

- No preloading (default). The modules are loaded on demand.
- Preloading of ALL modules.

To activate preloading, just configure the .forRoot() method with the property **preloadingStrategy**:

```typescript
RouterModule.forRoot(
  appRoutes,
  {
    enableTracing: true, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
  }
)
```

If we reload the application, we will see how the modules start to be downloaded in a lazy way just after the current component has been completely rendered on the screen.

## Custom preloading

It is also possible to program customized preloading strategies.

For this example, we are going to put a preload property in the data property of the paths of a couple of modules:

```typescript
{ path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', data: { preload: true } },
{ path: 'lazy1', loadChildren: 'app/lazy1/lazy1.module#Lazy1Module'},
{ path: 'lazy2', loadChildren: 'app/lazy2/lazy2.module#Lazy2Module'},
{ path: 'lazy3', loadChildren: 'app/lazy3/lazy3.module#Lazy3Module'},
{ path: 'lazy4', loadChildren: 'app/lazy4/lazy4.module#Lazy4Module', data: { preload: true } },
{ path: 'lazy5', loadChildren: 'app/lazy5/lazy5.module#Lazy5Module'},
```

And we are going to create a service that implements a selective preloading:

> ng g s selective-preloading-strategy --module=app-routing

We must implement the PreloadingStrategy interface, which forces us to implement the preload() function.

```typescript
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {

      console.log('Preloaded: ' + route.path);
      return load();

    } else {
      return Observable.of(null);
    }
  }
}
```

If we return the result of the load() method (load() method returns an Observable), the module will preload. If we return an Observable that emits a false, then the module will not preload.

In this example, only modules that have a preload property with true value will be loaded.

Now we change the preloadingStrategy of the routing module to our service.

```typescript
@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{
    enableTracing: false,
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule { }
```

Don't forget to provide the service!

https://angular.io/guide/router#preloading-background-loading-of-feature-areas

https://angular.io/guide/router#custom-preloading

[Índice](index.md)
