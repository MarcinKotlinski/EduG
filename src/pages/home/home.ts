import {Component} from '@angular/core';
import {AlertController, Events, NavController, ToastController} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {ListFile} from './listFile';
import {ServiceProvider} from '../../providers/service/service';
import {Files} from './files';
import {Network} from "@ionic-native/network";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  game;
  learning;
  special: Files[] = [];
  labor: Files[] = [];
  additional: Files[] = [];
  listFile: ListFile[] = [];
  counter: number = 0;

  constructor(private storage: Storage, private alertCtrl: AlertController, private toast: ToastController, private network: Network, public serviceProvider: ServiceProvider, public events: Events, public navCtrl: NavController, public global: GlobalProvider) {

    this.game = this.global.gameName;
    this.learning = 'special';

    this.loadUserData();
    this.logIn();
    // this.getSpecial();
    // this.getAdditional();
    // this.getLabo();
  }

  showAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
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

                  if (this.global.downloadMission == true) {
                    console.log("ENABLING FUNCTION");
                    this.logIn();
                    this.getSpecial();
                    this.getAdditional();
                    this.getLabo();
                    this.global.downloadMission = false;
                  }

                  console.log("gameName loading: " + gameName);
                  console.log("crc loading: " + crc);
                  console.log("md5 loading: " + md5);
                  console.log("email loading: " + email);
                  console.log("version loading: " + version);


                  console.log("agent number AFTER reading: " + data.user_account.agent_number);

                });
              });
            });
          });
        });
      });
    });
  }

  ionViewDidLeave() {
    if (this.global.internetConnection==false){
      this.showAlert('Bład','Brak połączenia z siecią.')
    }
    this.counter = 0;
  }

  logIn() {
    this.events.publish('user:login');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    if (this.counter == 0) {
      this.logIn();
      this.getSpecial();
      this.getAdditional();
      this.getLabo();
    }
    refresher.complete();
  }

  openFile(file){
    window.open(file);
  }

  getSpecial() {
    this.serviceProvider.getDataTestFiles(this.global.gameName).subscribe(data => {
      this.listFile = data.list_files;
      console.log(this.listFile);
      data.list_files.forEach(item => {
        if (item.file.category == "spec") {
          this.special.push(item.file);
          if (item.file.category==undefined){
            this.counter = 0;
          } else{
            this.counter = 1;
          }
        }
      });
      console.log(this.special);
    })
  }

  getLabo() {
    this.serviceProvider.getDataTestFiles(this.global.gameName).subscribe(data => {
      this.listFile = data.list_files;
      console.log(this.listFile);
      data.list_files.forEach(item => {
        if (item.file.category == "labo") {
          this.labor.push(item.file);
          if (item.file.category==undefined){
            this.counter = 0;
          } else{
            this.counter = 1;
          }
        }
      });
      console.log(this.labor);
    })
  }

  getAdditional() {
    this.serviceProvider.getDataTestFiles(this.global.gameName).subscribe(data => {
      this.listFile = data.list_files;
      console.log(this.listFile);
      data.list_files.forEach(item => {
        if (item.file.category == "doda") {
          this.additional.push(item.file);
          if (item.file.category==undefined){
            this.counter = 0;
          } else{
            this.counter = 1;
          }
        }
      });
      console.log(this.additional);
    })
  }
}
