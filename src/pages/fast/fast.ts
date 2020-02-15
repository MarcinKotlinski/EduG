import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {MissionFast} from "./missionFast";
import {GlobalProvider} from "../../providers/global/global";
import {Md5} from "ts-md5";
import {TabsPage} from "../tabs/tabs";
import {Network} from "@ionic-native/network";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {stringify} from "querystring";

@IonicPage()
@Component({
  selector: 'page-fast',
  templateUrl: 'fast.html',
})

export class FastPage {
  missionFast: MissionFast[];
  startText;
  finishText;
  mainText;
  header;
  crc;
  crcAnswer;
  answer: string='';
  tabBarElement;
  name;
  user: FormGroup;

  constructor(private toast: ToastController, private network: Network, public alertCtrl: AlertController, public global: GlobalProvider, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + this.global.gameNumber + this.global.agent_email + this.global.hash);
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.user = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9-_\:,.]{1,50}$')
      ])),
    });
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
    this.serviceProvider.getDataMissionFast(this.global.gameName, this.global.gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
      this.missionFast = Array.of(data.mission_fast);
      // console.log("misja"+data.mission_fast.mission);
      this.startText = data.mission_fast.intro_text;
      this.finishText = data.mission_fast.finish_text;
      this.header = data.mission_fast.codename;
    })
  }

  sendAnswer() {
    console.log('ODPOWIEDZ:' + this.answer);
    console.log("PUSH GAME NAME:"+this.global.gameName);
    console.log("PUSH GAME NUMBER:"+this.global.gameNumber);
    console.log("PUSH USER EMAIL:"+this.global.agent_email);
    console.log("PUSH MD5:"+this.global.hash);
    this.crcAnswer = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + this.global.gameNumber + this.answer + this.global.agent_email + this.global.hash);
    this.serviceProvider.sendAnswerFast(this.global.gameName, this.global.gameNumber, this.answer, this.global.agent_email, this.global.hash, this.crcAnswer).subscribe(data => {
      if (data.mission_fast.result === false) {
        this.showAlert('Sukces!', data.mission_fast.comment);
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.showAlert('Błąd!', data.mission_fast.comment);
      }
    });
        // this.showAlert('ojojoj!', 'Serwer napotkał problem, spróbuj ponownie później.');
  }

  showAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
