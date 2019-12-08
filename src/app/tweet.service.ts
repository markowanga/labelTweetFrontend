import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

interface ITweet {
  id: string;
  tweet: string;
}

interface IStat {
  all_tweets_count: number;
  labelled_tweets_count: number;
}

export interface ITweetDetails {
  tweet_id: string;
  tweet: string;
  hashtags: string;
  label: string;
  note: string;
  update_time: Date;
  username: string;
}

export interface LabelledTweets {
  tweets: ITweetDetails[];
}

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getUnlabelledTweet(username, labellingTag): Observable<ITweet> {
    return this.http.get<ITweet>(this.baseUrl + '/get_unlabelled_tweet?username=' + username +
      '&labelling_tag=' + labellingTag);
  }

  sendLabel(tweetId, label, username, note, labellingTag): Observable<any> {
    return this.http.put(this.baseUrl + '/save_label',
      {tweet_id: tweetId, label, username, note, labelling_tag: labellingTag});
  }

  getLabelingStats(username, labellingTag): Observable<IStat> {
    return this.http.get<IStat>(this.baseUrl + '/stats?username=' + username + '&labelling_tag=' + labellingTag);
  }

  sendTweetToExperts(username, labellingTag, tweetId): Observable<any> {
    return this.http.put(this.baseUrl + '/send_to_experts',
      {username, labelling_tag: labellingTag, tweet_id: tweetId});
  }

  getLabelledData(): Observable<LabelledTweets> {
    return this.http.get<LabelledTweets>(this.baseUrl + '/labelled_tweets').pipe(tap(it => console.log(it.tweets)));
  }
}
