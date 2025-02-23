import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/list/list.component';
import { EditeComponent } from './pages/edite/edite.component';
import { AddComponent } from './pages/add/add.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { isNotLoggedInGuard } from './core/guards/is-not-logged-in.guard';
import { CartComponent } from './pages/cart/cart.component';
import { DetailsComponent } from './pages/details/details.component';
import { LineItemsCartComponent } from './pages/line-items-cart/line-items-cart.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryItemComponent } from './pages/category-item/category-item.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [isNotLoggedInGuard] },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'list', component: ListComponent },
      { path: 'newletter', component: NewsletterComponent },
      {
        path: 'category',
        component: CategoriesComponent,

        children: [{ path: 'categoryItem', component: CategoryItemComponent }],
      },

      { path: 'edite', component: EditeComponent },
      { path: 'add', component: AddComponent },
      { path: 'details/:id', component: DetailsComponent },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
