import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, Subject, tap, throwError} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class PostsService {

    error = new Subject<string>();
    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post('https://recipe-app-f81b0-default-rtdb.firebaseio.com/posts.json',
         postData,
         {
            // this is by default, body means that you get the data extracted and converted to Javascript object
            // observe : 'body'
            observe : 'response'
         }
         ).subscribe(
            {
                next: (res) => { 
                    console.log(res);
                },
                error: (err) => {
                    this.error.next(err.message);
                }
            }
        );
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        return this.http.get('https://recipe-app-f81b0-default-rtdb.firebaseio.com/posts.json',
         {
            headers : new HttpHeaders({'Custom-Header': 'Hello'}),
            params : searchParams
         }
        )
            .pipe(map((responseData: any) => {
                console.log('Before transformation:', responseData);
                const postsArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key))
                        postsArray.push({ ...responseData[key], id: key })
                }
                return postsArray;
            }
            ),
            catchError(errorRes=>{
                // Send to analytics error
                // throwError is a function that yields new observable by wrapping an error
                // Old Syntaxt throwError(()=>error)
                return throwError(()=>errorRes);
            })
            );
    }

    deletePosts() {
        return this.http.delete('https://recipe-app-f81b0-default-rtdb.firebaseio.com/posts.json',
        {
            observe: 'events'
        }
        ).pipe(tap(event=>{
            // you can tap into these following HTTP Events if you want to do something
            if(event.type===HttpEventType.Sent)
            {

            }
            if(event.type ===HttpEventType.Response)
            {
                console.log(event.body);
            }
        }));
    }
}