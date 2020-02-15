import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Position} from "./position";
import {ExtraLeaderboards} from "./extraLeaderboards";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalProvider} from "../../providers/global/global";
import {Network} from "@ionic-native/network";

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
  specials: Position[] = [];
  labo: Position[] = [];
  fast: Position[] = [];
  full: Position[] = [];
  counter: number = 0;

  extraLeader: ExtraLeaderboards[] = [];
  agent;
  game;
  tabBarElement;
  version;


  constructor(public alertCtrl: AlertController, public global: GlobalProvider, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.version=this.global.version;

    if (this.version =='daily'){
      this.agent = 'special';
    }else if (this.version == 'after'){
      this.agent = 'super';
    }else{
      this.agent = 'laboratory';
    }

    this.game = this.global.gameName;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewWillEnter() {
    if (this.tabBarElement == !null) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement == !null) {
      this.tabBarElement.style.display = 'flex';
    }
  }

  ionViewDidLoad() {
    if (this.global.internetConnection == false) {
      this.showAlert('Bład', 'Brak połączenia z siecią.')
    }
    this.loadSpecial();
    this.loadLaboratory();
    this.loadFast();
    this.loadFull();
  }

  showAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLeave() {
    this.counter = 0;
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    if (this.counter == 0) {
      this.loadSpecial();
      this.loadLaboratory();
      this.loadFast();
      this.loadFull();
    }
    refresher.complete();

  }

  loadSpecial() {
    this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
      this.extraLeader = data.extra_leaderboards;
      console.log(this.extraLeader);
      data.extra_leaderboards.forEach(item => {
        if (item.position.type == "spec") {
          this.specials.push(item.position);
          if (item.position.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
    })
  }

  loadLaboratory() {
    this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
      this.extraLeader = data.extra_leaderboards;
      console.log(this.extraLeader);
      data.extra_leaderboards.forEach(item => {
        if (item.position.type == "labo") {
          this.labo.push(item.position);
          if (item.position.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
    })
  }


  loadFast() {
    this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
      this.extraLeader = data.extra_leaderboards;
      console.log(this.extraLeader);
      data.extra_leaderboards.forEach(item => {
        if (item.position.type == "fast") {
          this.fast.push(item.position);
          if (item.position.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
    })
  }

  loadFull() {
    this.serviceProvider.getDataTestLeader('extra_leaderboards.php', this.game).subscribe(data => {
      this.extraLeader = data.extra_leaderboards;
      console.log(this.extraLeader);
      data.extra_leaderboards.forEach(item => {
        if (item.position.type == "full") {
          this.full.push(item.position);
          if (item.position.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
    })
  }
}
