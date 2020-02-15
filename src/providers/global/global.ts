import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public version: string;
  public version2: number;
  public tabs: string;
  public laboVersion: string;
  public specVersion: string;
  public fastVersion: string;
  public hazdVersion: string;
  public lastVersion: string;

  public crc: string;
  public gameName: string;
  public gameNumber: string;
  public hash: string;
  public email: string;
  public profilePicture: any;
  public agent_number: string;
  public agent_name: string;
  public agent_email: string;
  public group_name: string;
  public count_bitcoin: number;
  public count_avatar: number;
  public count_exacoin: number;
  public count_mission: number;
  public count_point: number;
  public count_badges_style: number;
  public downloadMission: boolean;
  public internetConnection: boolean = true;

  constructor(public http: HttpClient) {

  }

  setMyGlobalVar(value) {
    this.profilePicture = value;
  }

  getMyGlobalVar() {
    return this.profilePicture;
  }

}
