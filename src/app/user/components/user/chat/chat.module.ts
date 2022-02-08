import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatListModule } from '@angular/material/list';
import { ChatComponent } from './components/chat.component';
import { ChatService } from './services/chat.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { chatReducers } from './store/reducers/chat.reducer';
import { ChatEffect } from './store/effects/chat.effect';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('chat', chatReducers),
    EffectsModule.forFeature([ChatEffect]),
    FormsModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [ChatService],
})
export class ChatModule {}
