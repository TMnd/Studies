import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetchingPosts = false;
  error = null;
  private errorSub: Subscription;

  constructor(
    private postsService: PostService
  ) {}

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.postsService.fetchPosts()
    .subscribe({
        next: (postsArray) => {
          this.isFetchingPosts = false;
          this.loadedPosts = postsArray;
        },
        error: (error) => this.error=error.message
        //complete: () => console.info('complete') 
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetchingPosts = true;
    this.postsService.fetchPosts()
    .subscribe({
      next: (postsArray) => {
        this.isFetchingPosts = false;
        this.loadedPosts = postsArray;
      },
      error: (error) => {
        this.isFetchingPosts = false;
        this.error = error.message;
        console.log(error);
      }
      //complete: () => console.info('complete') 
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

  onHandleError() {
    this.error=null;
  }
}
