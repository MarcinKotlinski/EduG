import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {ExtraAchievement} from "./extraAchievement";
import {Mission} from "./mission";
import {GlobalProvider} from "../../providers/global/global";
import {Network} from "@ionic-native/network";


@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage {

  specials: Mission[] = [];
  labo: Mission[] = [];
  fast: Mission[] = [];
  final: Mission[] = [];
  counter: number = 0;
  check;
  tabBarElement;
  version;

  extraAchievement: ExtraAchievement[];
  agent;

  constructor(private alertCtrl: AlertController, private toast: ToastController, private network: Network, public global: GlobalProvider, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.version=this.global.version;

    if (this.version =='daily'){
      this.agent = 'special';
    }else{
      this.agent = 'laboratory';
    }

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    console.log("tabs bar: "+this.tabBarElement);


  }

  ionViewWillEnter() {
    if (this.tabBarElement ==! null) {
      this.tabBarElement.style.display = 'none';
      console.log("enter");
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement ==! null) {
      this.tabBarElement.style.display = 'flex';
      console.log("leave");
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    if (this.counter == 0) {
      this.loadSpecial();
      this.loadLaboratory();
      this.loadFast();
      this.loadFinal();
    }
    refresher.complete();
  }

  showAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    if (this.global.internetConnection == false) {
      this.showAlert('Bład', 'Brak połączenia z siecią.')
    }

    this.loadSpecial();
    this.loadLaboratory();
    this.loadFast();
    this.loadFinal();
  }

  ionViewDidLeave() {
    this.counter = 0;
  }

  loadSpecial() {
    console.log('gameNameAchieve', this.global.gameName + this.global.agent_number);

    this.serviceProvider.getDataTestAchievements(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraAchievement = data.extra_achievements;
      console.log(this.extraAchievement);
      data.extra_achievements.forEach(item => {
        if (item.mission.type == "spec") {
          this.specials.push(item.mission);
          if (item.mission.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
    });
  }

  loadLaboratory() {
    this.serviceProvider.getDataTestAchievements(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraAchievement = data.extra_achievements;
      console.log(this.extraAchievement);
      data.extra_achievements.forEach(item => {
        if (item.mission.type == "labo") {
          this.labo.push(item.mission);
        }
      });
    })
  }

  loadFast() {
    this.serviceProvider.getDataTestAchievements(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraAchievement = data.extra_achievements;
      console.log(this.extraAchievement);
      data.extra_achievements.forEach(item => {
        if (item.mission.type == "fast") {
          this.fast.push(item.mission);
        }
      });
    })
  }

  loadFinal() {
    this.serviceProvider.getDataTestAchievements(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraAchievement = data.extra_achievements;
      console.log(this.extraAchievement);
      data.extra_achievements.forEach(item => {
        if (item.mission.type == "last") {
          this.final.push(item.mission);
        }
      });
    })
  }
}
