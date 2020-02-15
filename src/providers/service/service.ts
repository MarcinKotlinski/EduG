import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RootObject} from "../../pages/medals/RootObject";
import {RootObjectLeader} from "../../pages/ranking/RootObjectLeader";
import {RootObjectGame} from "../../pages/login/RootObjectGame";
import {GlobalProvider} from "../global/global";
import {RootObjectMission} from "../../app/RootObjectMission";
import {RootObjectFast} from "../../pages/fast/RootObjectFast";
import {RootObjectAchievement} from "../../pages/achievements/RootObjectAchievement";
import {RootObjectPresence} from "../../pages/presence/RootObjectPresence";
import {RootObjectLogin} from "../../pages/login/RootObjectLogin";
import {RootObjectAccount} from "../../pages/login/RootObjectAccount";
import { RootObjectFiles } from '../../pages/home/RootObjectFiles';
import {RootObjectMissionSpecial} from "../../pages/special/RootObjectMissionSpecial";
import {RootObjectMissionLaboratory} from "../../pages/laboratory/RootObjectMissionLaboratory";

const API_URL = 'https://www.edug.pl/_webservices';

@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello ServiceProvider Provider');
  }

  GAME=this.global.gameName;

  getDataTest(idg, idu): Observable<RootObject> {
    return this.http.get<RootObject>(`${API_URL}/extra_badges.php?lang=pl&idg=${idg}&idu=${idu}`);
  }

  getDataTestLeader(url, game): Observable<RootObjectLeader> {
    return this.http.get<RootObjectLeader>(`${API_URL}/${url}?idg=${game}`);
  }

  getDataTestGame(url): Observable<RootObjectGame> {
    return this.http.get<RootObjectGame>(`${API_URL}/${url}`);
  }

  getDataTestMissions(idg): Observable<RootObjectMission> {
    return this.http.get<RootObjectMission>(`${API_URL}/list_missions.php?idg=${idg}`);
  }

  getDataMissionFast(codegame, mission, login, hash, crc): Observable<RootObjectFast> {
    return this.http.get<RootObjectFast>(`${API_URL}/mission_fast.php?sys=wp&lang=pl&game=${codegame}&mission=${mission}&login=${login}&hash=${hash}&crc=${crc}`);
  }

  getDataTestAchievements(idg, idu): Observable<RootObjectAchievement> {
    return this.http.get<RootObjectAchievement>(`${API_URL}/extra_achievements.php?idg=${idg}&idu=${idu}`);
  }

  getDataTestPresence(idg, idu): Observable<RootObjectPresence> {
    return this.http.get<RootObjectPresence>(`${API_URL}/extra_attendances.php?idg=${idg}&idu=${idu}`);
  }

  getDataTestFiles(game): Observable<RootObjectFiles> {
    return this.http.get<RootObjectFiles>(`${API_URL}/list_files.php?idg=${game}`);
  }

  getDataTestLogin(codegame, login, hash, crc): Observable<RootObjectLogin> {
    return this.http.get<RootObjectLogin>(`${API_URL}/user_login.php?sys=wp&lang=pl&game=${codegame}&login=${login}&hash=${hash}&crc=${crc}`);
  }

  getUserData(codegame, login, hash, crc): Observable<RootObjectAccount> {
    return this.http.get<RootObjectAccount>(`${API_URL}/user_account.php?sys=wp&lang=pl&game=${codegame}&login=${login}&hash=${hash}&crc=${crc}`);
  }

  getDataMissionSpecial(codegame, mission, login, hash, crc): Observable<RootObjectMissionSpecial> {
    return this.http.get<RootObjectMissionSpecial>(`${API_URL}/mission_spec.php?sys=wp&lang=pl&game=${codegame}&mission=${mission}&login=${login}&hash=${hash}&crc=${crc}`);
  }

  getDataMissionLaboratory(codegame, mission, login, hash, crc): Observable<RootObjectMissionLaboratory> {
    return this.http.get<RootObjectMissionLaboratory>(`${API_URL}/mission_labo.php?sys=wp&lang=pl&game=${codegame}&mission=${mission}&login=${login}&hash=${hash}&crc=${crc}`);
  }

  sendAnswerFast(codegame, mission, answer, login, hash, crc): Observable<RootObjectFast> {
    return this.http.get<RootObjectFast>(`${API_URL}/mission_fast.php?sys=wp&lang=pl&game=${codegame}&mission=${mission}&answer=${answer}&login=${login}&hash=${hash}&crc=${crc}`);
  }

  sendAnswerSpecial(codegame, mission, answer1, answer2, answer3, answer4, login, hash, crc): Observable<RootObjectMissionSpecial> {
    return this.http.get<RootObjectMissionSpecial>(`${API_URL}/mission_spec.php?sys=wp&lang=pl&game=${codegame}&mission=${mission}&answer1=${answer1}&answer2=${answer2}&answer3=${answer3}&answer4=${answer4}&login=${login}&hash=${hash}&crc=${crc}`);
  }




}
