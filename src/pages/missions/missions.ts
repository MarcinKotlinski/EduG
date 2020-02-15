import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Mission} from "../../app/mission";
import {ServiceProvider} from "../../providers/service/service";
import {GlobalProvider} from "../../providers/global/global";
import {ListMission} from "../../app/listMission";
import {Md5} from "ts-md5";
import {SpecialPage} from "../special/special";
import {LaboratoryPage} from "../laboratory/laboratory";
import {FastPage} from "../fast/fast";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-missions',
  templateUrl: 'missions.html',
})
export class MissionsPage {

  special: Mission[] = [];
  laboratory: Mission[] = [];
  fast: Mission[] = [];
  final: Mission[] = [];
  now;
  date;
  parsedDate;
  counter: number = 0;
  learning;
  myFlagLabo: boolean = false;
  myFlagSpec: boolean = false;
  myFlagFast: boolean = false;
  version;


  crc;
  crcData;
  email;
  md5;
  gameName;

  tabBarElement;
  game;
  bitcoins;
  exacoins;
  avatars;
  points;
  missions;

  listMission: ListMission[] = [];


  constructor(private storage: Storage, public events: Events, public menuCtrl: MenuController, public alertCtrl: AlertController, public serviceProvider: ServiceProvider, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.now = new Date();
    this.learning = 'all';
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.version = this.global.version;

    if (this.global.downloadMission == true) {
      console.log("ENABLING FUNCTION");
      this.logIn();
      this.bitcoin();
      this.global.downloadMission = false;
    }

    this.game = this.global.gameName;
    this.bitcoins = this.global.count_bitcoin;
    this.exacoins = this.global.count_exacoin;
    this.avatars = this.global.count_avatar;
    this.points = this.global.count_point;
    this.missions = this.global.count_mission;

  }

  ionViewDidLoad() {
    this.loadUserData();

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    if (this.counter == 0) {
      this.loadSpecial(this.global.gameName);
      this.loadFast(this.global.gameName);
      this.loadLabo(this.global.gameName);
    }
    refresher.complete();
  }

  loadUserData() {
    this.storage.get('version').then((version) => {
      this.storage.get('profilePicture').then((profilePicture) => {
        this.storage.get('crc').then((crc) => {
          this.storage.get('email').then((email) => {
            this.storage.get('gameName').then((gameName) => {
              this.storage.get('md5').then((md5) => {
                this.serviceProvider.getUserData(gameName, email, md5, crc).subscribe(data => {
                  this.global.gameName = gameName;
                  this.global.version = version;
                  this.global.agent_number = data.user_account.agent_number;
                  this.global.agent_name = data.user_account.agent_name;
                  this.global.agent_email = data.user_account.agent_email;
                  this.global.group_name = data.user_account.group_name;
                  this.global.count_bitcoin = data.user_account.count_bitcoin;
                  this.global.count_avatar = data.user_account.count_avatar;
                  this.global.count_exacoin = data.user_account.count_exacoin;
                  this.global.count_mission = data.user_account.count_mission;
                  this.global.count_point = data.user_account.count_point;
                  this.global.count_badges_style = data.user_account.count_badges_style;
                  this.global.downloadMission = true;
                  this.global.profilePicture = profilePicture;
                  this.global.hash = md5;

                  this.game = this.global.gameName;
                  this.bitcoins = this.global.count_bitcoin;
                  this.exacoins = this.global.count_exacoin;
                  this.avatars = this.global.count_avatar;
                  this.points = this.global.count_point;
                  this.missions = this.global.count_mission;

                  if (this.global.downloadMission == true) {
                    console.log("ENABLING FUNCTION");
                    this.logIn();
                    this.bitcoin();
                    this.global.downloadMission = false;
                  }

                  console.log("gameName loading: " + gameName);
                  console.log("crc loading: " + crc);
                  console.log("md5 loading: " + md5);
                  console.log("email loading: " + email);
                  console.log("version loading: " + version);


                  console.log("agent number AFTER reading: " + data.user_account.agent_number);

                  if (this.counter == 0) {
                    this.loadSpecial(gameName);
                    this.loadFast(gameName);
                    this.loadLabo(gameName);
                  }
                });
              });
            });
          });
        });
      });
    });
  }

  loadSpecial(game) {
    this.serviceProvider.getDataTestMissions(game).subscribe(data => {
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
        // console.log("eMPTYYYYY"+this.special);
      });
    })
  }

  loadLabo(game) {
    this.serviceProvider.getDataTestMissions(game).subscribe(data => {
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
          console.log("LABORATORY INFO: " + this.myFlagLabo)
        }
      });
    })
  }

  loadFast(game) {
    this.serviceProvider.getDataTestMissions(game).subscribe(data => {
      this.listMission = data.list_missions;
      console.log(this.listMission);
      data.list_missions.forEach(item => {
        this.date = item.mission.stop;
        this.parsedDate = new Date(this.date);
        if (item.mission.type == "fast" && this.now < this.parsedDate) {
          this.myFlagFast = true;
          this.fast.push(item.mission);
          // console.log("FAST TABLE:" + this.fast.length)
        } else {
          this.myFlagFast = false;
        }
      });
    })
  }

  pushMissionSpecial(gameNumber) {
    if (this.global.internetConnection == true) {
      this.global.gameNumber = gameNumber;
      this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + gameNumber + this.global.agent_email + this.global.hash);
      this.serviceProvider.getDataMissionSpecial(this.global.gameName, gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
        if (data.mission_fast.result === true) {
          console.log("RESULT :" + data.mission_fast.result);
          this.navCtrl.push(SpecialPage);
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
          this.navCtrl.push(LaboratoryPage);
          this.menuCtrl.close();
        } else {
          this.showAlert('Uwaga!', 'Już odpowiedziałeś na pytania dotyczące tej Misji Laboratoryjnej.')
        }
      });
    } else {
      this.showAlert('Błąd!', 'Brak połączenia z siecią.')
    }
  }

  pushMissionFast(gameNumber) {
    if (this.global.internetConnection == true) {
      this.global.gameNumber = gameNumber;
      this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + gameNumber + this.global.agent_email + this.global.hash);
      this.serviceProvider.getDataMissionFast(this.global.gameName, gameNumber, this.global.agent_email, this.global.hash, this.crc).subscribe(data => {
        if (data.mission_fast.result === true) {
          this.navCtrl.push(FastPage);
          this.menuCtrl.close();
        } else {
          this.showAlert('Uwaga!', 'Już odpowiedziałeś na pytania dotyczące tej Misji Błyskawicznej.')
        }
      });
    } else {
      this.showAlert('Błąd!', 'Brak połączenia z siecią.')
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

  logIn() {
    this.events.publish('user:login');
  }

  bitcoin() {
    this.events.publish('user:bitcoin');
  }
}
