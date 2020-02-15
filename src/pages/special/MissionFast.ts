import {Answers4} from "./Answers4";
import {Answers3} from "./Answers3";
import {Answers2} from "./Answers2";
import {Answers1} from "./Answers1";

export interface MissionFast {
  result: boolean;
  codename: string;
  mission_start: string;
  intro_text: string;
  question_1: string;
  answers_1: Answers1;
  question_2: string;
  answers_2: Answers2;
  question_3: string;
  answers_3: Answers3;
  question_4: string;
  answers_4: Answers4;
  finish_time: string;
  finish_text: string;
  comment: string;
}
