import {Component} from '@angular/core';
import {Events, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {PresencePage} from "../presence/presence";
import {RankingPage} from "../ranking/ranking";
import {AchievementsPage} from "../achievements/achievements";
import {MedalsPage} from "../medals/medals";
import {GlobalProvider} from "../../providers/global/global";
import {TabsPage} from "../tabs/tabs";
import {MissionsPage} from "../missions/missions";
import {Storage} from "@ionic/storage";
import {ServiceProvider} from "../../providers/service/service";
import {Badge} from "../medals/badge";
import {ExtraBadge} from "../medals/extraBadge";
import {Position} from "../ranking/position";
import {ExtraLeaderboards} from "../ranking/extraLeaderboards";
import {ListMission} from "../../app/listMission";
import {Mission} from "../../app/mission";

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  game;
  bitcoins;
  exacoins;
  avatars;
  points;
  missions;
  learning;
  badges: Badge[] = [];
  extraBadge: ExtraBadge[] = [];
  counter: number = 0;
  email;
  md5;
  crc;
  imgsrc;
  special: Mission[] = [];
  date;
  parsedDate;
  now;


  specials: Position[] = [];
  labo: Position[] = [];
  fast: Position[] = [];
  full: Position[] = [];
  extraLeader: ExtraLeaderboards[] = [];
  listMission: ListMission[] = [];



  constructor(private serviceProvider: ServiceProvider, private storage: Storage, public global: GlobalProvider, public events: Events, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.now = new Date();

    this.game = this.global.gameName;
    this.bitcoins = this.global.count_bitcoin;
    this.exacoins = this.global.count_exacoin;
    this.avatars = this.global.count_avatar;
    this.points = this.global.count_point;
    this.missions = this.global.count_mission;
    this.learning = 'special';

    if (this.global.downloadMission == true){
      console.log("ENABLING FUNCTION");
      this.logIn();
      this.bitcoin();
      this.global.downloadMission = false;
    }
    // this.loadMedals();
  }

  ionViewDidLoad(){
    this.loadSpecial();
    // this.loadLaboratory();
    // this.loadFast();
    // this.loadFull();
  }

  // loadMedals() {
  //   this.serviceProvider.getDataTest(this.global.gameName, this.global.agent_number).subscribe(data => {
  //     this.extraBadge = data.extra_badges;
  //     console.log(this.extraBadge);
  //     data.extra_badges.forEach(item => {
  //       this.badges.push(item.badge);
  //       this.imgsrc = "../../assets/imgs/"+item.badge.file;
  //
  //       if (item.badge.desc == undefined) {
  //         this.counter = 0;
  //       } else {
  //         this.counter = 1;
  //       }
  //     });
  //     console.log("badges"+this.badges);
  //     this.badges.forEach(item => console.log(item.file));
  //   })
  // }

  loadSpecial() {
    this.serviceProvider.getDataTestMissions(this.global.gameName).subscribe(data => {
      this.listMission = data.list_missions;
      console.log(this.listMission);
      data.list_missions.forEach(item => {
        this.date = item.mission.stop;
        this.parsedDate = new Date(this.date);
        if (this.now.getTime() < this.parsedDate.getTime()) {
          this.special.push(item.mission);
          if (item.mission.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
          console.log('licznik: ' + this.counter);
        }
      });
    })
  }

  // loadSpecial() {
  //   this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
  //     this.extraLeader = data.extra_leaderboards;
  //     console.log(this.extraLeader);
  //     data.extra_leaderboards.forEach(item => {
  //       if (item.position.type == "spec") {
  //         this.specials.push(item.position);
  //         if (item.position.type == undefined) {
  //           this.counter = 0;
  //         } else {
  //           this.counter = 1;
  //         }
  //       }
  //     });
  //   })
  // }

  // loadLaboratory() {
  //   this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
  //     this.extraLeader = data.extra_leaderboards;
  //     console.log(this.extraLeader);
  //     data.extra_leaderboards.forEach(item => {
  //       if (item.position.type == "labo") {
  //         this.labo.push(item.position);
  //       }
  //     });
  //   })
  // }

  //
  // loadFast() {
  //   this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
  //     this.extraLeader = data.extra_leaderboards;
  //     console.log(this.extraLeader);
  //     data.extra_leaderboards.forEach(item => {
  //       if (item.position.type == "fast") {
  //         this.fast.push(item.position);
  //       }
  //     });
  //   })
  // }
  //
  // loadFull() {
  //   this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
  //     this.extraLeader = data.extra_leaderboards;
  //     console.log(this.extraLeader);
  //     data.extra_leaderboards.forEach(item => {
  //       if (item.position.type == "full") {
  //         this.full.push(item.position);
  //       }
  //     });
  //   })
  // }


  logIn() {
    this.events.publish('user:login');
  }

  bitcoin() {
    this.events.publish('user:bitcoin');
  }

  doRefresh(refresher) {
    console.log('Begin async operation');

    this.navCtrl.setRoot(TabsPage);
    refresher.complete();
  }


  // loadData(){
  //   this.serviceProvider.getUserData(this.global.gameName, this.global.agent_email, this.md5, this.crc).subscribe(data => {
  //     this.global.agent_name = data.user_account.agent_name;
  //     this.global.agent_email = data.user_account.agent_email;
  //     this.global.group_name = data.user_account.group_name;
  //     this.global.count_bitcoin = data.user_account.count_bitcoin;
  //     this.global.count_avatar = data.user_account.count_avatar;
  //     this.global.count_exacoin = data.user_account.count_exacoin;
  //     this.global.count_mission = data.user_account.count_mission;
  //     this.global.count_point = data.user_account.count_point;
  //     this.global.count_badges_style = data.user_account.count_badges_style;
  //
  //     console.log("bitcooin"+this.global.count_bitcoin);
  //     console.log("bitcoinStart"+this.global.count_bitcoin);
  //     console.log("agent_number"+this.global.agent_number);
  //     console.log("gameNAme"+this.global.gameName);
  //     console.log("email"+this.email);
  //     console.log("md5"+this.md5);
  //     console.log("crc"+this.crc);
  //
  //   });
  // }

  // ionViewDidLoad(){
  //   this.storage.get('gameName').then((val) => {
  //     this.global.gameName = val;
  //     console.log('Your gameName is', val);
  //   });
  //   this.storage.get('email').then((val) => {
  //     this.email = val;
  //     console.log('Your email is', val);
  //   });
  //   this.storage.get('hash').then((val) => {
  //     this.md5 = val;
  //     console.log('Your hash is', val);
  //   });
  //   this.storage.get('crc').then((val) => {
  //     this.crc = val;
  //     console.log('Your crc is', val);
  //   });
  //   this.storage.get('agent_number').then((val) => {
  //     this.global.agent_number = val;
  //     console.log('Your agent_number is', val);
  //   });
  //   this.storage.get('agent_name').then((val) => {
  //     this.global.agent_name = val;
  //     console.log('Your agent_name is', this.global.agent_name);
  //   });
  //   this.storage.get('agent_email').then((val) => {
  //     this.global.agent_email = val;
  //     console.log('Your agent_email is', val);
  //   });
  //   this.storage.get('group_name').then((val) => {
  //     this.global.group_name = val;
  //     console.log('Your group_name is', val);
  //   });
  //
  //   this.loadData();
  // }
}
