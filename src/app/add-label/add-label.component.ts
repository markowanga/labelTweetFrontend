import {Component, OnInit} from '@angular/core';
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
  allTweetsToLabel: number;
  username = '';
  labellingTag = '';
  nameControl = new FormControl('');
  labellingTagControl = new FormControl('');
  noteControl = new FormControl('');

  constructor(private tweetService: TweetService) {
  }

  ngOnInit(): void {
  }

  getTweet(): void {
    this.tweetService.getUnlabelledTweet(this.username, this.labellingTag).subscribe(
      tweet => {
        this.tweet = tweet.tweet;
        this.tweetId = tweet.id;
      }
    );
  }

  sendLabel(label): void {
    this.tweetService.sendLabel(this.tweetId, label, this.username, this.noteControl.value, this.labellingTag)
      .subscribe(
        () => {
          this.noteControl.setValue('');
          this.getTweet();
          this.getStats();
        }
      );
  }

  getStats() {
    this.tweetService.getLabelingStats(this.username, this.labellingTag).subscribe(
      stats => {
        this.labelledTweetCount = stats.labelled_tweets_count;
        this.allTweetsToLabel = stats.all_tweets_count;
      }
    );
  }

  sendTweetToExperts() {
    this.tweetService.sendTweetToExperts(this.username, this.labellingTag, this.tweetId)
      .subscribe(
        () => {
          this.noteControl.setValue('');
          this.getTweet();
          this.getStats();
        }
      );
  }

  setUsernameAndTag() {
    this.username = this.nameControl.value;
    this.labellingTag = this.labellingTagControl.value;

    // post actions
    this.getTweet();
    this.getStats();
  }

}
