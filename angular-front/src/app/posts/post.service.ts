import { Post } from './post.model';
import { Subject} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class PostService {
 private posts: Post[] = [];
 private postUpdated = new Subject<Post[]>();

 getPosts() {
   return [...this.posts];
 }

 getPostUpdateListener() {
   return this.postUpdated.asObservable();
 }

 addPost(doctorName: string, patientName: string, treatment: string) {
   const post: Post = { doctorName: doctorName, patientName: patientName, treatment: treatment};
   this.posts.push(post);
   this.postUpdated.next([...this.posts]);
 }
}
