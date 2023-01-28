import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import {map, Subject} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class PostsService {

    error = new Subject<string>();
    constructor(private http : HttpClient){}

    createAndStorePost(title : string, content:string){
        const postData  : Post = {title : title, content: content};
        this.http.post('https://recipe-app-f81b0-default-rtdb.firebaseio.com/posts.json', postData).subscribe(
            {
                next : (res)=>{},
                error : (err)=>{
                    this.error.next(err.message);
                }
            }
        );
    }

    fetchPosts(){
       return this.http.get('https://recipe-app-f81b0-default-rtdb.firebaseio.com/posts.json')
        .pipe(map((responseData : any) => {
          console.log('Before transformation:',responseData);
          const postsArray = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key))
            postsArray.push({...responseData[key], id : key})
          }
          return postsArray;
        }));
    }

    deletePosts(){
        return this.http.delete('https://recipe-app-f81b0-default-rtdb.firebaseio.com/posts.json');
    }
}