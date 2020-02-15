import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MedalsPage} from "../pages/medals/medals";
import {PresencePage} from "../pages/presence/presence";
import {RankingPage} from "../pages/ranking/ranking";
import {AchievementsPage} from "../pages/achievements/achievements";
import {GlobalProvider} from "../providers/global/global";
import {Mission} from "./mission";
import {ServiceProvider} from "../providers/service/service";
import {ListMission} from "./listMission";
import {FastPage} from "../pages/fast/fast";
import {TabsPage} from "../pages/tabs/tabs";
import {SpecialPage} from "../pages/special/special";
import {LaboratoryPage} from "../pages/laboratory/laboratory";
import {Md5} from "ts-md5";
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;


  version;
  rootPage: any = LoginPage;
  crc;
  userName;
  gameMain;
  email;
  special: Mission[] = [];
  laboratory: Mission[] = [];
  fast: Mission[] = [];
  final: Mission[] = [];
  profilePictureMenu;
  now;
  date;
  parsedDate;
  counter: number = 0;
  agentNumber;
  groupName;
  profileOptions;

  myFlagLabo: boolean = false;
  myFlagSpec: boolean = false;
  myFlagFast: boolean = false;

  listMission: ListMission[] = [];

  pages: Array<{ title: string, component: any }>;

  constructor(private storage: Storage, public events: Events, public serviceProvider: ServiceProvider, public global: GlobalProvider, public alertCtrl: AlertController, public menuCtrl: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.now = new Date();

    storage.get('version').then((version) => {
      storage.get('login').then((val) => {
        console.log('Your age is', val);
        if (val == true) {
          this.global.version = version;
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      });
    });

    this.profileOptions = {
      title: 'Wybierz opcję:',
    };

    this.onMenuClicked();

    events.subscribe('user:login', () => {
      this.loggedIn();
    });

    this.email = this.global.email;

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'home', component: HomePage},
    ];
  }

  saveit(site) {
    window.open(site);
  }

  showAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  loggedIn() {
    this.version = this.global.version;
    this.profilePictureMenu = this.global.profilePicture;
    this.gameMain = this.global.gameName;
    this.userName = this.global.agent_name;
    this.agentNumber = this.global.agent_number;
    this.groupName = this.global.group_name;
    console.log("loggedin" + this.gameMain);
    console.log("COUNTER: " + this.counter);
    if (this.counter == 0) {
      this.loadSpecial();
      this.loadFast();
      this.loadLabo();
    }
    this.global.downloadMission = false;
    console.log("EnableParamAfter" + this.global.downloadMission);
  }

  onMenuClicked() {
    this.events.publish('toggleMenu')
  }

  loadSpecial() {
    this.serviceProvider.getDataTestMissions(this.gameMain).subscribe(data => {
      this.listMission = data.list_missions;
      console.log(this.listMission);
      data.list_missions.forEach(item => {
        this.date = item.mission.stop;
        this.parsedDate = new Date(this.date);
        if (item.mission.type == "spec" && this.now.getTime() < this.parsedDate.getTime()) {
          this.myFlagSpec = true;
          this.special.push(item.mission);
          if (item.mission.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
          console.log('licznik: ' + this.counter);
        } else {
          this.myFlagSpec = false;
        }
      });
    })
  }

  loadLabo() {
    this.serviceProvider.getDataTestMissions(this.gameMain).subscribe(data => {
      this.listMission = data.list_missions;
      console.log(this.listMission);
      data.list_missions.forEach(item => {
        this.date = item.mission.stop;
        this.parsedDate = new Date(this.date);
        if (item.mission.type == "labo" && this.now.getTime() < this.parsedDate.getTime()) {
          this.myFlagLabo = true;
          this.laboratory.push(item.mission);
        } else {
          this.myFlagLabo = false;
        }
      });
    })
  }

  loadFast() {
    this.serviceProvider.getDataTestMissions(this.gameMain).subscribe(data => {
      this.listMission = data.list_missions;
      console.log(this.listMission);
      data.list_missions.forEach(item => {
        this.date = item.mission.stop;
        this.parsedDate = new Date(this.date);
        if (item.mission.type == "fast" && this.now < this.parsedDate) {
          this.myFlagFast = true;
          this.fast.push(item.mission);
        } else {
          this.myFlagFast = false;
        }
      });
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  pushMedal() {
    this.nav.setRoot(MedalsPage);
    this.menuCtrl.close();
  }

  pushHome() {
    if (this.global.version == 'after'){
      this.nav.setRoot(TabsPage);
      this.menuCtrl.close();
    } else{
      this.nav.setRoot(HomePage);
      this.menuCtrl.close();
    }
  }

  pushStart() {
    this.nav.setRoot(TabsPage);
    this.menuCtrl.close();
  }

  pushPresence() {
    this.nav.setRoot(PresencePage);
    this.menuCtrl.close();
  }

  pushRanking() {
    this.nav.setRoot(RankingPage);
    this.menuCtrl.close();
  }

  pushMissionSpecial(gameNumber) {
    if (this.global.internetConnection == true) {
      this.global.gameNumber = gameNumber;
      this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + gameNumber + this.global.agent_email + this.global.hash);
      this.serviceProvider.getDataMissionSpecial(this.global.gameName, gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
        if (data.mission_fast.result === true) {
          this.nav.push(SpecialPage);
          this.menuCtrl.close();
        } else {
          this.showAlert('Uwaga!', 'Już odpowiedziałeś na pytania dotyczące tej Misji Specjalnej.')
        }
      });
    } else {
      this.showAlert('Błąd!', 'Brak połączenia z siecią.')
    }
  }

  pushMissionLaboratory(gameNumber) {
    if (this.global.internetConnection == true) {
      this.global.gameNumber = gameNumber;
      this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + gameNumber + this.global.agent_email + this.global.hash);
      this.serviceProvider.getDataMissionLaboratory(this.global.gameName, gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
        if (data.mission_fast.result === true) {
          this.nav.push(LaboratoryPage);
          this.menuCtrl.close();
        } else {
          this.showAlert('Uwaga!', 'Już odpowiedziałeś na pytania dotyczące tej Misji Laboratoryjnej.')
        }
      });
    } else {
      this.showAlert('Błąd!', 'Brak połączenia z siecią.')
    }
  }

  pushAchievements() {
    this.nav.setRoot(AchievementsPage);
    this.menuCtrl.close();
  }

  pushMissionFast(gameNumber) {
    if (this.global.internetConnection == true) {
      this.global.gameNumber = gameNumber;
      this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + gameNumber + this.global.agent_email + this.global.hash);
      this.serviceProvider.getDataMissionFast(this.global.gameName, gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
        if (data.mission_fast.result === true) {
          this.nav.push(FastPage);
          this.menuCtrl.close();
        } else {
          this.showAlert('Uwaga!', 'Już odpowiedziałeś na pytania dotyczące tej Misji Błyskawicznej.')
        }
      });
    } else {
      this.showAlert('Błąd!', 'Brak połączenia z siecią.')
    }
  }

  logout() {
    this.nav.setRoot(LoginPage);
    this.menuCtrl.close();
    this.storage.set('login', false);
  }
}
