import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MissionFast} from "./MissionFast";
import {GlobalProvider} from "../../providers/global/global";
import {ServiceProvider} from "../../providers/service/service";
import {Md5} from "ts-md5";
import {Network} from "@ionic-native/network";
import {RemovehtmltagsPipe} from "../../pipes/removehtmltags/removehtmltags";

/**
 * Generated class for the LaboratoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laboratory',
  templateUrl: 'laboratory.html',
})
export class LaboratoryPage {
  missionFast: MissionFast[];
  finishText;
  newFinishText;
  mainText;
  header;
  crc;
  date;
  tabBarElement;


  constructor(private toast: ToastController, private network: Network, public serviceProvider: ServiceProvider, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + this.global.gameNumber + this.global.agent_email + this.global.hash);
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
    this.mainText = this.global.gameNumber;
    this.serviceProvider.getDataMissionLaboratory(this.global.gameName, this.global.gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
      this.missionFast = Array.of(data.mission_fast);
      this.finishText = data.mission_fast.finish_text;
      this.header = data.mission_fast.codename;
    })
  }

  isChecked = false;

  openFile(file) {
    window.open(file);
  }

  myFunction(event) {
    this.isChecked = !this.isChecked; // I am assuming you want to switch between checking and unchecking while clicking on radio.
  }
}
