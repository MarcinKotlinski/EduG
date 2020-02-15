import { NgModule } from '@angular/core';
import { GamePipe } from './game/game';
import { RemovehtmltagsPipe } from './removehtmltags/removehtmltags';
@NgModule({
	declarations: [GamePipe,
    RemovehtmltagsPipe],
	imports: [],
	exports: [GamePipe,
    RemovehtmltagsPipe]
})
export class PipesModule {}
