import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.mode';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetchingPosts = false;

  constructor(
    private http: HttpClient, 
    private postsService: PostService
  ) {}

  ngOnInit() {
    this.postsService.fetchPosts()
    .subscribe(postsArray => {
        this.isFetchingPosts = false;
        this.loadedPosts = postsArray;
    });;
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetchingPosts = true;
    this.postsService.fetchPosts()
    .subscribe(postsArray => {
        this.isFetchingPosts = false;
        this.loadedPosts = postsArray;
    });
  }

  onClearPosts() {
    // Send Http request
    this.isFetchingPosts = true;
    this.postsService.deletePosts().subscribe(() => {
      this.isFetchingPosts = false;
      this.loadedPosts = [];
    });
  }
}
