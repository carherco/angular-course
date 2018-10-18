# Dynamic component loading

In this topic we will see how to use **ComponentFactoryResolver** to add components to a view dynamically.

## EntryComponents

First of all, we have to declare the dynamic components in the property **entryComponents** of the metadata of the decorator *@NgModule* of our module.

```typescript
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { AppComponent }         from './app.component';
import { HeroJobAdComponent }   from './hero-job-ad.component';
import { AdBannerComponent }    from './ad-banner.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdDirective }          from './ad.directive';
import { AdService }            from './ad.service';

@NgModule({
  imports: [ BrowserModule ],
  providers: [AdService],
  declarations: [ AppComponent,
                  AdBannerComponent,
                  HeroJobAdComponent,
                  HeroProfileComponent,
                  AdDirective ],
  entryComponents: [ HeroJobAdComponent, HeroProfileComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {}
}
```

## Step 1: Create a directive to indicate where to load the components

```ts
//src/app/ad.directive.ts
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
```

This directive has access to the *view container* of the element to which it applies.

## Step 2: Include the directive in some html

In src/app/ad-banner.component.html:

```html
<div class="ad-banner">
  <h3>Advertisements</h3>
  <ng-template ad-host></ng-template>
</div>
```

The &lt;ng-template> element is a good choice for dynamic components because it does not render anything by itself.

## Step 3: Programming the dynamic load

```ts
//src/app/ad-banner.component.ts
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[
    {component: Ad1Component, data: {} },
    {component: Ad2Component, data: {} },
  ];
  currentAdIndex = -1;
  @ViewChild(AdDirective) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
```

This component, every 3 seconds, selects a component and uses the service **ComponentFactoryResolver** to solve a **ComponentFactory** for each specific component. The ComponentFactory then creates an instance of each component.

We obtain a reference to the **viewContainerRef** thanks to the decorator @ViewChild and call the method **createComponent()**.

The **createComponent()** method returns a reference to the newly loaded component. Thanks to that reference, we can access the properties and methods of the component.

## Advice

If we make the dynamically loaded components implement an Interface, we make sure that all of them have the properties and / or methods that we need.