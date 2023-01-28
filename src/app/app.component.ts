import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: any = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }
    })
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content).subscribe({
      next: (res) => {

      },
      error: (err: Error) => {

      }
    });

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

}
