import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  MenuController,
  ToastController
} from 'ionic-angular';
import {AlertController} from "ionic-angular";
import {ServiceProvider} from "../../providers/service/service";
import {Game} from "./game";
import {ListGames} from "./listGames";
import {GlobalProvider} from "../../providers/global/global";
import md5 from 'crypto-md5';
import {Md5} from 'ts-md5/dist/md5';
import {Events} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {UserLogin} from "./userLogin";
import {UserAccount} from "./userAccount";
import {Network} from "@ionic-native/network";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userLogin: UserLogin[] = [];
  userAccount: UserAccount[] = [];
  games: Game[] = [];
  listGames: ListGames[] = [];
  profilePicture: any = "https://www.gravatar.com/avatar/";
  email: string = '';
  password: string = '';
  counter: number = 0;
  md5;
  crc;
  codename;
  value;

  constructor(private storage: Storage, private toast: ToastController, private network: Network, public menuCtrl: MenuController, public events: Events, public global: GlobalProvider, public serviceProvider: ServiceProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.network.onConnect().subscribe(() => {
      this.global.internetConnection=true;
      console.log('connected');
      this.toast.create({
        message: 'Połączono z siecią',
        duration: 4000
      }).present();
    });

    this.network.onDisconnect().subscribe(() => {
      this.global.internetConnection=false;
      console.log('disconnected');
      this.toast.create({
        message: 'Brak połaczenia z siecią',
        duration: 4000
      }).present();
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'authenticated');
    this.getGames();
  }

  getGames(){
    this.serviceProvider.getDataTestGame('list_games.php').subscribe(data => {
      this.listGames = data.list_games;
      console.log(this.listGames);
      data.list_games.forEach(item => {
        if (item.game.active == 'Y') {
          this.games.push(item.game);
          this.global.version2 = item.game.missions.length;
          if (item.game.active == undefined){
            this.counter = 0;
          } else {
            this.counter = 1;
          }
        }
      });
      console.log(this.games);
    })
  }

  emailChanged() {
    this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex') + "?d=wavatar";
    this.storage.set('profilePicture', this.profilePicture);
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
    console.log('Begin async operation');

    if (this.counter == 0) {
      this.getGames();
    }
    refresher.complete();
  }

  loginUser() {
    if (this.global.internetConnection == false) {
      this.showAlert('Bład', 'Brak połączenia z siecią.')
    } else {
      this.md5 = Md5.hashStr(this.password);
      console.log("MISSSIONS1111:"+this.global.gameName);
      console.log("MISSSIONS2222:"+this.global.version2);
      this.crc = Md5.hashStr('grauman' + 'wp' + 'pl' + this.global.gameName + this.email + this.md5);
      this.global.profilePicture = this.profilePicture;
      this.global.downloadMission = true;
      this.global.crc=this.crc;

      if (this.global.version2==24){
        this.global.version='daily';
        console.log('VERSION: '+this.global.version)
      }else if (this.global.version2 == 9){
        this.global.version='weekly';
        console.log('VERSION: '+this.global.version)
      }else if (this.global.version2 == 0){
        this.global.version='after';
        console.log('VERSION: '+this.global.version)
      }

      console.log('version:' + this.md5);
      this.storage.set('version', this.global.version);
      console.log('md5:' + this.md5);
      this.storage.set('md5', this.md5);
      console.log('email:' + this.email);
      this.storage.set('email', this.email);
      console.log('password:' + this.password);
      console.log('game:' + this.global.gameName);
      console.log('final: ' + this.global.profilePicture);
      console.log('crc:' + this.crc);
      this.storage.set('crc', this.crc);
      this.storage.set('gameName', this.global.gameName);
      this.global.hash = this.md5;

      this.serviceProvider.getDataTestLogin(this.global.gameName, this.email, this.md5, this.crc).subscribe(data => {
        this.userLogin = Array.of(data.user_login);
        console.log("IfTrue" + data.user_login.result);
        if (data.user_login.result === true) {

          this.storage.set('login', true);
          this.storage.set('hash', this.md5);
          this.storage.set('gameName', this.global.gameName);


          const loader = this.loadingCtrl.create({
            content: "Ładowanie systemu...",
            duration: 1000
          });

          loader.present();
          this.navCtrl.setRoot(TabsPage);



          console.log("Wynik logowania" + this.userLogin);

        } else {
          this.showAlert('Błąd', 'Niewłaściwy adres email lub hasło.');
          this.storage.set('login', false);
        }
        console.log(this.userLogin);
      });
    }
  }
  onChange(codename) {
    this.global.gameName = codename.missionCodename;
    this.global.version2 = codename.missionLength;
  }
}
