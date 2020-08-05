import { Post } from './post.model';
import { Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class PostService {
 private posts: Post[] = [];
 private postUpdated = new Subject<Post[]>();

 constructor(private http: HttpClient) {}

 getPosts() {
  this.http.get<Post[]>('http://localhost:3000/doctors')
    .subscribe((postData) => {
      this.posts = postData;
      this.postUpdated.next([...this.posts]);
    });
 }

 getPostUpdateListener() {
   return this.postUpdated.asObservable();
 }

 addPost(doctorName: string, patientName: string, treatment: string) {
   const post: Post = { doctorsName: doctorName, patientsName: patientName, treatment: treatment};

   this.http.post('http://localhost:3000/doctors', post)
    .subscribe((responseData) =>
    {
      console.log(responseData);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
 }
}
