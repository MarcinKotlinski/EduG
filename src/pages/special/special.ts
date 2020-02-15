import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {MissionFast} from "./MissionFast";
import {GlobalProvider} from "../../providers/global/global";
import {Md5} from "ts-md5";
import {TabsPage} from "../tabs/tabs";
import {Network} from "@ionic-native/network";

@IonicPage()
@Component({
  selector: 'page-special',
  templateUrl: 'special.html',
})
export class SpecialPage {
  missionFast: MissionFast[] = [];
  startText;
  finishText;
  mainText;
  header;
  crcAnswer;
  crc;

  question11;
  question12;
  question13;
  question14;

  question21;
  question22;
  question23;
  question24;

  question31;
  question32;
  question33;
  question34;

  question41;
  question42;
  question43;
  question44;

  allAnswers = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';
  answer4 = '';
  tabBarElement;

  counter1;
  counter2;
  counter3;
  counter4;


  constructor(private toast: ToastController, private network: Network, public alertCtrl: AlertController, public global: GlobalProvider, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + this.global.gameNumber + this.global.agent_email + this.global.hash);
    console.log('crc ' + this.crc);
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
    console.log('game number:' + this.global.gameNumber);
    this.mainText = this.global.gameNumber;
    this.serviceProvider.getDataMissionSpecial(this.global.gameName, this.global.gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
      this.missionFast = Array.of(data.mission_fast);
      this.startText = data.mission_fast.intro_text;
      this.finishText = data.mission_fast.finish_text;
      console.log("misja" + this.startText);
    })
  }

  sendAnswer() {
    this.allAnswers = '';
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';

    this.counter1 = 0;
    this.counter2 = 0;
    this.counter3 = 0;
    this.counter4 = 0;

    let tablee1 = [{check: this.question11, value: 1}, {check: this.question12, value: 2}, {
      check: this.question13,
      value: 3
    }, {check: this.question14, value: 4}];
    let tablee2 = [{check: this.question21, value: 1}, {check: this.question22, value: 2}, {
      check: this.question23,
      value: 3
    }, {check: this.question24, value: 4}];
    let tablee3 = [{check: this.question31, value: 1}, {check: this.question32, value: 2}, {
      check: this.question33,
      value: 3
    }, {check: this.question34, value: 4}];
    let tablee4 = [{check: this.question41, value: 1}, {check: this.question42, value: 2}, {
      check: this.question43,
      value: 3
    }, {check: this.question44, value: 4}];

    for (let entry of tablee1) {
      if (entry.check == true) {
        this.answer1 += entry.value;
      } else {
        this.counter1 += 1;
      }
    }
    console.log('answer1' + this.answer1);

    for (let entry of tablee2) {
      if (entry.check == true) {
        this.answer2 += entry.value;
      } else {
        this.counter2 += 1;
      }
    }
    console.log('answer2' + this.answer2);

    for (let entry of tablee3) {
      if (entry.check == true) {
        this.answer3 += entry.value;
      } else {
        this.counter3 += 1;
      }
    }
    console.log('answer3' + this.answer3);

    for (let entry of tablee4) {
      if (entry.check == true) {
        this.answer4 += entry.value;
      } else {
        this.counter4 += 1;
      }
    }
    console.log('answer4' + this.answer4);

    this.crcAnswer = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + this.global.gameNumber + this.answer1 + this.answer2 + this.answer3 + this.answer4 + this.global.agent_email + this.global.hash);

    if (this.counter1 == 4 || this.counter2 == 4 || this.counter3 == 4 || this.counter4 == 4) {
      this.showAlert("Błąd!", 'W każdym pytaniu musisz zaznaczyć przynajmniej jedną odpowiedź.');
    } else {
      this.serviceProvider.sendAnswerSpecial(this.global.gameName, this.global.gameNumber, this.answer1, this.answer2, this.answer3, this.answer4, this.global.agent_email, this.global.hash, this.crcAnswer).subscribe(data => {
        if (data.mission_fast.result === false) {
          this.showAlert('Sukces!', data.mission_fast.comment);
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.showAlert('Błąd!', 'Serwer napotkał problem, spróbuj ponownie później.');
        }
      });
      // this.showAlert("Jest okej!", 'Wszystko jest zaznaczone poprawnie');
    }
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
