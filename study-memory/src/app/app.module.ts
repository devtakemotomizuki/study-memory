import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

/* created component */
import { RecordAndDisplayComponent } from './record-and-display/record-and-display.component';
import { RecordCalendarComponent } from './tab-item/record-calendar/record-calendar.component';
import { RecordGraphComponent } from './tab-item/record-graph/record-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordAndDisplayComponent,
    RecordCalendarComponent,
    RecordGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    NgbModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
