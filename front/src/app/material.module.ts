import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule, 
         MatSlideToggleModule, MatCardModule, MatIconModule, 
         MatTableModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatSlideToggleModule, MatCardModule, MatIconModule, MatTableModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatSlideToggleModule, MatCardModule, MatIconModule, MatTableModule],
})
export class MaterialModule { }