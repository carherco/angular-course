import { FractalModule } from './fractal/fractal.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ChildCompComponent } from './components/child-comp/child-comp.component';
import { ClickMeComponent } from './components/click-me/click-me.component';
import { ColdObservablesComponent } from './components/cold-observables/cold-observables.component';
import { CrudBasicoComponent } from './components/crud-basico/crud-basico.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeComponent } from './components/home/home.component';
import { KeyUpComponent } from './components/key-up/key-up.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { LoginComponent } from './components/login/login.component';
import { ParentCompComponent } from './components/parent-comp/parent-comp.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';

import { HighlightDirective } from './directives/highlight.directive';

import { AuthGuard } from './guards/auth.guard';
import { ConfimarGuard } from './guards/confimar.guard';
import { PruebaGuard } from './guards/prueba.guard';

import { AuthService } from './services/auth.service';
import { HeroService } from './services/hero.service';
import { HeroeService } from './services/heroe.service';
import { MockHeroeService } from './services/mock-heroe.service';
import { UserService } from './services/user.service';
import { UsuarioService } from './services/usuario.service';
import { NavComponent } from './components/nav/nav.component';

import { LayoutModule } from '@angular/cdk/layout';
import { PipesComponent } from './components/pipes/pipes.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { RotateDirective } from './directives/rotate.directive';
import { RotateComponent } from './components/rotate/rotate.component';
import { CronoComponent } from './components/crono/crono.component';
import { HeroesContainerComponent } from './components/heroes-container/heroes-container.component';
import { HeroesListPresenterComponent } from './components/heroes-list-presenter/heroes-list-presenter.component';
import { HeroesAddPresenterComponent } from './components/heroes-add-presenter/heroes-add-presenter.component';
import { HeroesEditPresenterComponent } from './components/heroes-edit-presenter/heroes-edit-presenter.component';
import { ReduxHeroesContainerComponent } from './components/redux-heroes-container/redux-heroes-container.component';
import { ReduxHeroesEditPresenterComponent } from './components/redux-heroes-edit-presenter/redux-heroes-edit-presenter.component';
import { ReduxHeroesListPresenterComponent } from './components/redux-heroes-list-presenter/redux-heroes-list-presenter.component';
import { ReduxHeroesAddPresenterComponent } from './components/redux-heroes-add-presenter/redux-heroes-add-presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickMeComponent,
    PipesComponent,
    CalculadoraComponent,
    KeyUpComponent,
    HeroFormComponent,
    HeroListComponent,
    ColdObservablesComponent,
    HeroSearchComponent,
    ReactiveFormComponent,
    CrudBasicoComponent,
    ChildCompComponent,
    ParentCompComponent,
    GaleriaComponent,
    LoginComponent,
    HomeComponent,
    HomePageComponent,
    LifecycleComponent,
    HighlightDirective,
    HighlightComponent,
    NavComponent,
    RotateDirective,
    RotateComponent,
    CronoComponent,
    HeroesContainerComponent,
    HeroesListPresenterComponent,
    HeroesAddPresenterComponent,
    HeroesEditPresenterComponent,
    ReduxHeroesContainerComponent,
    ReduxHeroesEditPresenterComponent,
    ReduxHeroesListPresenterComponent,
    ReduxHeroesAddPresenterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FractalModule
  ],
  providers: [
    MockHeroeService,
    HeroeService,
    HeroService,
    UsuarioService,
    UserService,
    AuthService,
    PruebaGuard,
    ConfimarGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
