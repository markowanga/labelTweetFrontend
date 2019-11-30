import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TweetService} from '../tweet.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {

  tweetId: string;
  tweet: string;
  labelledTweetCount: number;
  username = '';
  nameControl = new FormControl('');
  noteControl = new FormControl('');

  constructor(private tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.getTweet();
    this.getStats();
  }

  getTweet(): void {
    this.tweetService.getTweet().subscribe(
      tweet => {
        this.tweet = tweet.tweet;
        this.tweetId = tweet.id;
      }
    );
  }

  sendLabel(label): void {
    this.tweetService.sendLabel(this.tweetId, label, this.username, this.noteControl.value).subscribe(
      () => {
        this.noteControl.setValue('');
        this.getTweet();
        this.getStats();
      }
    );
  }

  getStats() {
    this.tweetService.getLabelingStats().subscribe(
      stats => {
        this.labelledTweetCount = stats.labelled_tweets_count;
      }
    );
  }

  setUsername() {
    this.username = this.nameControl.value;
  }

}
