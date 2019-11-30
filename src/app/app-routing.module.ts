import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LabeledTweetComponent} from './labeled-tweet/labeled-tweet.component';
import {AddLabelComponent} from './add-label/add-label.component';

const routes: Routes = [
  {path: 'label-tweet', component: AddLabelComponent},
  {path: '', component: LabeledTweetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
