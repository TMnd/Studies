import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.mode";

@Injectable({providedIn: 'root'})
export class PostService{

    constructor(
        private http: HttpClient
    ){}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http
        .post<{name: string}>(
            'https://angularstudy-bdaae-default-rtdb.europe-west1.firebasedatabase.app/posts.json', 
            postData
        ).subscribe(responseData => {
            console.log(responseData);
        });
    }

    fetchPosts() {
        return this.http
        .get<{ [key: string]: Post }>('https://angularstudy-bdaae-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
        .pipe(
            map(responseData => {
                const postsArray: Post[] = [];
                for(const key in responseData) {
                if ( responseData.hasOwnProperty(key)) {
                    postsArray.push({...responseData[key], id: key});
                }
                }
                return postsArray;
            }
        ));
    }

    deletePosts() {
        return this.http.delete('https://angularstudy-bdaae-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
    }
}