import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from "../post.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First post', contetn: 'This is the first post content'},
  //   {title: 'Second post', contetn: 'This is the second post content'},
  //   {title: 'Third post', contetn: 'This is the third post content'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
