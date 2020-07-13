import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
