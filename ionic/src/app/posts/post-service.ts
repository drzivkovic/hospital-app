import { Post } from './post-model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})

export class PostService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getPosts() {
        this.http.get<Post[]>('http://localhost:3000/doctors')
            .subscribe(postData => {
                this.posts = postData;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPost(id: string) {
        return this.http.get<{_id: string, doctorName: string, patientName: string, treatment: string}>('http://localhost:3000/doctors/' + id);
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(doctorName: string, patientName: string, treatment: string) {
        const post: Post = { id: null, doctorName: doctorName, patientName: patientName, treatment: treatment};

        this.http.post('http://localhost:3000/doctors', post)
            .subscribe(responseData => {
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, doctorName: string, patientName: string, treatment: string) {
        const post: Post = {id, doctorName, patientName, treatment};

        this.http.put('http://localhost:3000/doctors/' + id, post)
            .subscribe(response => {
                const updatePosts = [...this.posts];
                const oldPostIndex = updatePosts.findIndex(p => p.id === post.id);

                updatePosts[oldPostIndex] = post;
                this.posts = updatePosts;
                this.postUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/doctors/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }
}