import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: any = [];
  isFetching = false;
  error = null;
  private errorSub! : Subscription;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.isFetching = true;
    this.errorSub = this.postService.error.subscribe({
      next : (errorMessage:any)=>{
        this.error= errorMessage;
      }
    })
    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (err)=> {
        console.log(err);
        this.error = err.error.error;
      },
    })
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }
    })
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe({
      next : (res)=>{
        this.loadedPosts = [];
      }
    })
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
