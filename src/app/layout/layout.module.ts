import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MainContainerComponent } from './main-container/main-container.component';

@NgModule({
  declarations: [AppHeaderComponent, MainContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [AppHeaderComponent, MainContainerComponent]
})
export class LayoutModule { }
