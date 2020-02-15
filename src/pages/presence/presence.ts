import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ExtraAttendance} from "./extraAttendance";
import {ServiceProvider} from "../../providers/service/service";
import {Mission} from "./mission";
import {GlobalProvider} from "../../providers/global/global";
import {Network} from "@ionic-native/network";

/**
 * Generated class for the PresencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-presence',
  templateUrl: 'presence.html',
})
export class PresencePage {

  finall: Mission[] = [];
  labor: Mission[] = [];
  agent;
  extraAttendance: ExtraAttendance[];
  counter: number = 0;
  tabBarElement;

  constructor(public alertCtrl: AlertController, private toast: ToastController, private network: Network, public global: GlobalProvider, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.agent = 'final';
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewWillEnter() {
    if (this.tabBarElement ==! null) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement ==! null) {
      this.tabBarElement.style.display = 'flex';
    }
  }

  ionViewDidLoad() {
    if (this.global.internetConnection == false) {
      this.showAlert('Bład', 'Brak połączenia z siecią.')
    }
    this.loadFinal();
    this.loadLaboratory();
  }

  showAlert(title: string, message: string) {
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
      this.loadLaboratory();
      this.loadFinal();
    }
    refresher.complete();
  }

  ionViewDidLeave() {
    this.counter = 0;
  }

  loadFinal() {
    this.serviceProvider.getDataTestPresence(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraAttendance = data.extra_attendances;
      console.log(this.extraAttendance);
      data.extra_attendances.forEach(item => {
        if (item.mission.type == "W") {
          this.finall.push(item.mission);
          if (item.mission.type == undefined) {
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
    })
  }

  loadLaboratory() {
    this.serviceProvider.getDataTestPresence(this.global.gameName, this.global.agent_number).subscribe(data => {
      this.extraAttendance = data.extra_attendances;
      console.log(this.extraAttendance);
      data.extra_attendances.forEach(item => {
        if (item.mission.type == "L") {
          this.labor.push(item.mission);
        }
      });
    })
  }


}
