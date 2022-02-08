import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { PersistanceService } from '../shared/services/persistance.service';
import { UserComponent } from './components/user/user.component';
import { UserGuard } from './guards/user.guard';
import { UserService } from './services/user.service';
import { UserEffect } from './store/effects/user.effect';
import { userReducers } from './store/reducers/user.reducer';
import { ChatModule } from './components/user/chat/chat.module';
import { FindComponent } from './components/user/find/find.component';
import { ListComponent } from './components/user/list/list.component';
import { FindEffect } from './store/effects/find.effect';
import { SentComponent } from './components/user/sent/sent.component';
import { RecievedComponent } from './components/user/recieved/recieved.component';
import { Error404Component } from '../shared/components/error404/error404.component';
import { SendEffect } from './store/effects/sent.effect';
import { ReceivedEffect } from './store/effects/received.effect';
import { ListEffect } from './store/effects/list.effect';
import { ChatComponent } from './components/user/chat/components/chat.component';

const routes = [
  {
    path: 'user/:user',
    component: UserComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'friend-list',
        component: ListComponent,
      },
      {
        path: 'find-friend',
        component: FindComponent,
      },
      {
        path: 'request-sent',
        component: SentComponent,
      },
      {
        path: 'request-received',
        component: RecievedComponent,
      },

      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'chat',
      },
    ],
  },
  {
    path: 'user',
    redirectTo: '/user/current',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    UserComponent,
    FindComponent,
    ListComponent,
    SentComponent,
    RecievedComponent,
  ],
  imports: [
    ChatModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('user', userReducers),
    EffectsModule.forFeature([
      UserEffect,
      ListEffect,
      FindEffect,
      SendEffect,
      ReceivedEffect,
    ]),
    MatExpansionModule,
    MatDividerModule,
    // MatProgressSpinnerModule,
    //ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSidenavModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [PersistanceService, UserService],
})
export class UserModule {}
