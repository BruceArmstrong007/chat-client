import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageComponent } from './components/page/page.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const routes = [
  {
    path: 'page',
    component: PageComponent,
    children: [
      {
        path: '**',
        redirectTo: '/page',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/page',
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
})
export class PageModule {}
