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
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductslistComponent } from './pages/productslist/productslist.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'layout',
    component: LayoutComponent,

    children: [
      { path: '', component: HomeComponent },
      { path: 'list', component: ListComponent },
      { path: 'newletter', component: NewsletterComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'allProducts', component: ProductslistComponent },
      {
        path: 'category',
        component: CategoriesComponent,

        children: [{ path: 'categoryItem', component: CategoryItemComponent }],
      },
      { path: 'cartComponent', component: CartComponent },

      { path: 'edite', component: EditeComponent },
      { path: 'add', component: AddComponent },
      { path: 'details/:id', component: DetailsComponent },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
