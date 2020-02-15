import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FastPage } from './fast';

@NgModule({
  declarations: [
    FastPage,
  ],
  imports: [
    IonicPageModule.forChild(FastPage),
  ],
})
export class FastPageModule {}
