import {Component, OnInit, ViewChild} from '@angular/core';
import {ITweetDetails, TweetService} from '../tweet.service';
import {environment} from '../../environments/environment';
import {saveAs} from 'file-saver';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-labeled-tweet',
  templateUrl: './labeled-tweet.component.html',
  styleUrls: ['./labeled-tweet.component.css']
})
export class LabeledTweetComponent implements OnInit {

  displayedColumns: string[] = ['tweet_id', 'hashtags', 'tweet', 'label', 'username', 'update_time', 'note'];
  dataSource = new MatTableDataSource<ITweetDetails>([]);
  imageBaseUrl = environment.apiUrl;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {

    this.tweetService.getLabelledData().subscribe(tweetData => {
      this.dataSource = new MatTableDataSource<ITweetDetails>(tweetData.tweets);
      this.dataSource.paginator = this.paginator;
    });
  }

  downloadResults() {
    saveAs(environment.apiUrl + '/get_all_results', 'result.json');
  }

  downloadReportOfUserLabelSameTweet() {
    saveAs(environment.apiUrl + '/tweet_labels_file', 'user_labels.txt');
  }

}
