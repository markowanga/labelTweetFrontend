import {Component, OnInit} from '@angular/core';
import {TweetService} from '../tweet.service';

@Component({
  selector: 'app-labeled-tweet',
  templateUrl: './labeled-tweet.component.html',
  styleUrls: ['./labeled-tweet.component.css']
})
export class LabeledTweetComponent implements OnInit {

  displayedColumns: string[] = ['tweet_id', 'hashtags', 'tweet', 'label', 'username', 'update_time', 'note'];
  dataSource = [];

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    this.tweetService.getLabelledData().subscribe(tweetData => {
      this.dataSource = tweetData.tweets;
      console.log(this.dataSource.length);
      console.log(this.dataSource[0]);
    });
  }

}
