import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline';
import { ProgressBarComponent } from './progress-bar/progress-bar';
@NgModule({
	declarations: [TimelineComponent,
    ProgressBarComponent],
	imports: [],
	exports: [TimelineComponent,
    ProgressBarComponent]
})
export class ComponentsModule {}
