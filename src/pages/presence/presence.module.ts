import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresencePage } from './presence';

@NgModule({
  declarations: [
    PresencePage,
  ],
  imports: [
    IonicPageModule.forChild(PresencePage),
  ],
})
export class PresencePageModule {}
