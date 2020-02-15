import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {ServiceProvider} from '../providers/service/service';
import {MedalsPage} from "../pages/medals/medals";
import {HttpClientModule} from "@angular/common/http";
import {RankingPage} from "../pages/ranking/ranking";
import {AchievementsPage} from "../pages/achievements/achievements";
import {PresencePage} from "../pages/presence/presence";
import {IonTextAvatar} from 'ionic-text-avatar';
import {GamePipe} from "../pipes/game/game";
import { GlobalProvider } from '../providers/global/global';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import {FastPage} from "../pages/fast/fast";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import {TabsPage} from "../pages/tabs/tabs";
import {SpecialPage} from "../pages/special/special";
import {LaboratoryPage} from "../pages/laboratory/laboratory";
import {Network} from "@ionic-native/network";
import {RemovehtmltagsPipe} from "../pipes/removehtmltags/removehtmltags";
import {MissionsPage} from "../pages/missions/missions";
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MedalsPage,
    RankingPage,
    AchievementsPage,
    PresencePage,
    IonTextAvatar,
    GamePipe,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    FastPage,
    ProgressBarComponent,
    TabsPage,
    SpecialPage,
    LaboratoryPage,
    RemovehtmltagsPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MedalsPage,
    RankingPage,
    AchievementsPage,
    PresencePage,
    FastPage,
    TabsPage,
    SpecialPage,
    LaboratoryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    GlobalProvider,
    Network
  ]
})
export class AppModule {
}
