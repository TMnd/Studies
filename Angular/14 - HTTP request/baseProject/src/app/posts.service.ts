import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "./post.mode";

@Injectable({providedIn: 'root'})
export class PostService{

    error = new Subject<string>();

    constructor(
        private http: HttpClient
    ){}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http
        .post<{name: string}>(
            'https://angularstudy-bdaae-default-rtdb.europe-west1.firebasedatabase.app/posts.json', 
            postData
        ).subscribe({
            next: (responseData) => console.log(responseData),
            error: (error) => this.error.next(error),
            //complete: () => console.info('complete') 
        });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        searchParams = searchParams.append('custom','key');
        return this.http
        .get<{ [key: string]: Post }>(
            'https://angularstudy-bdaae-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            {
                headers: new HttpHeaders({
                    "Custom-Header": "hello"
                }),
                params: searchParams
            }
        )
        .pipe(
            map(responseData => {
                const postsArray: Post[] = [];
                for(const key in responseData) {
                if ( responseData.hasOwnProperty(key)) {
                    postsArray.push({...responseData[key], id: key});
                }
                }
                return postsArray;
            }),
            catchError(errorRes => {
                //Send to analytics server
                return throwError(() => new Error(errorRes));
            })
        );
    }

    deletePosts() {
        return this.http.delete('https://angularstudy-bdaae-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
    }
}