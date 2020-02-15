import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {Badge} from "./badge";
import {ExtraBadge} from "./extraBadge";
import {RootObject} from "./RootObject";
import {GlobalProvider} from "../../providers/global/global";
import {Network} from "@ionic-native/network";

@IonicPage()
@Component({
  selector: 'page-medals',
  templateUrl: 'medals.html',
})
export class MedalsPage {
  badges: Badge[] = [];
  extraBadge: ExtraBadge[] = [];
  counter: number = 0;
  tabBarElement;


  constructor(private toast: ToastController, private network: Network, public global: GlobalProvider, public alertCtrl: AlertController, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
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
      this.showAlertInternet('Bład', 'Brak połączenia z siecią.')
    }
    this.loadMedals();
  }

  ionViewDidLeave() {
    this.counter = 0;
  }

  showAlertInternet(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    if (this.counter == 0) {
      this.loadMedals();
    }
    refresher.complete();
  }

  showAlert(subtitle) {
    const alert = this.alertCtrl.create({
      title: 'Jak mnie zdobyć?',
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  loadMedals() {
    this.serviceProvider.getDataTest(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraBadge = data.extra_badges;
      console.log(this.extraBadge);
      data.extra_badges.forEach(item => {
        this.badges.push(item.badge)
        if (item.badge.desc == undefined) {
          this.counter = 0;
        } else {
          this.counter = 1;
        }
      });
      console.log(this.badges);
      this.badges.forEach(item => console.log(item.name));
    })
  }
}
