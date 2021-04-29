import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

/* import bootstrap */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* angular material component */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

/* created component */
import { RecordAndDisplayComponent } from './record-and-display/record-and-display.component';
import { RecordCalendarComponent } from './tab-item/record-calendar/record-calendar.component';
import { RecordGraphComponent } from './tab-item/record-graph/record-graph.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AfterSendMailComponent } from './after-send-mail/after-send-mail.component';
import { AddSubjectDialogComponent } from './add-subject-dialog/add-subject-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordAndDisplayComponent,
    RecordCalendarComponent,
    RecordGraphComponent,
    LoginFormComponent,
    SignupFormComponent,
    AfterSendMailComponent,
    AddSubjectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    NgbModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule ,
    MatDialogModule,
  ],
  entryComponents:[
    AddSubjectDialogComponent
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
