import {Component} from '@angular/core';
import {Events, IonicPage, MenuController, NavController} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {ServiceProvider} from "../../providers/service/service";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  game;
  bitcoins;
  exacoins;
  avatars;
  points;
  missions;
  learning;
  version;

  missionsRoot;
  avataryRoot;
  bitcoinsRoot;
  exacoinsRoot;
  pointsRoot;
  languageRoot;

  constructor(public serviceProvider: ServiceProvider, public menuCtrl: MenuController, public events: Events, public navCtrl: NavController, public global: GlobalProvider) {
    this.loadStartPage();

    events.subscribe('user:bitcoin', () => {
      console.log("gogogoogogogogoogogogogoogog");
      this.bitcoin();
      this.version = this.global.version;
    });

    console.log("bitcoinTabs"+this.global.count_bitcoin);
    this.version = this.global.version;
    this.menuCtrl.enable(true, 'authenticated');
    this.game = this.global.gameName;
    this.bitcoins = this.global.count_bitcoin;
    this.exacoins = this.global.count_exacoin;
    this.avatars = this.global.count_avatar;
    this.points = this.global.count_point;
    this.missions = this.global.count_mission;
    this.learning = 'special';

    console.log("mission" + this.global.count_mission);
    console.log("EnableParamBefore"+this.global.downloadMission);
  }

  bitcoin(){
    console.log("BITCOIN DATA LOADING");
    this.bitcoins = this.global.count_bitcoin;
    this.exacoins = this.global.count_exacoin;
    this.avatars = this.global.count_avatar;
    this.points = this.global.count_point;
    this.missions = this.global.count_mission;
    this.version=this.global.version;
  }

  loadStartPage(){
    console.log("VERSION FROM MEMORY:"+this.global.version);
    if (this.global.version=='after'){
      this.missionsRoot = HomePage;
      this.avataryRoot = HomePage;
      this.bitcoinsRoot = HomePage;
      this.exacoinsRoot = HomePage;
      this.pointsRoot = HomePage;
      this.languageRoot = HomePage;
    } else {
      this.missionsRoot = 'MissionsPage';
      this.avataryRoot = 'MissionsPage';
      this.bitcoinsRoot = 'MissionsPage';
      this.exacoinsRoot = 'MissionsPage';
      this.pointsRoot = 'MissionsPage';
      this.languageRoot = 'MissionsPage';
    }
  }
}
