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

    // get all doctors
    getPosts() {
        this.http.get<Post[]>('http://localhost:3000/doctors')
            .subscribe(postData => {
                // update the array of posts with data from serv
                this.posts = postData;
                this.postUpdated.next([...this.posts]);
            });
    }

    // get doctor by id
    getPost(id: string) {
        return this.http.get<{_id: string, doctorName: string, patientName: string, treatment: string}>('http://localhost:3000/doctors/' + id);
    }

    // listen object but cant emit it
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    // add a new doctor
    addPost(doctorName: string, patientName: string, treatment: string) {
        const post: Post = { id: null, doctorName: doctorName, patientName: patientName, treatment: treatment};

        this.http.post('http://localhost:3000/doctors', post)
            .subscribe(responseData => {
                //push the new docotor to doctors  array
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);

                // go back to the root page
                this.router.navigate(['/']);
            });
    }

    // update a doctor
    updatePost(id: string, doctorName: string, patientName: string, treatment: string) {
        const post: Post = {id, doctorName, patientName, treatment};

        this.http.put('http://localhost:3000/doctors/' + id, post)
            .subscribe(response => {
                const updatePosts = [...this.posts];
                // get the id of the doctor that we are updating
                const oldPostIndex = updatePosts.findIndex(p => p.id === post.id);

                // set the doctor that we are updating to updated doctor
                updatePosts[oldPostIndex] = post;
                // set the list of the doctors to the list odf updated doctors 
                this.posts = updatePosts;
                this.postUpdated.next([...this.posts]);

                // go back to the root page
                this.router.navigate(['/']);
            });
    }

    // delete doctor
    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/doctors/' + postId)
            .subscribe(() => {
                // create a list of doctors without deleted doctor
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                // set the list of the doctors to the list odf updated doctors 
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }
}