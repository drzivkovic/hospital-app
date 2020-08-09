import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post-model';
import { PostService } from "../post-service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isloading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostService) {}

  ngOnInit() {
    // show loader
    this.isloading = true;
    // get all the doctors
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        // hide loader
        this.isloading = false;
        // populate the page with the list of all doctors
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
