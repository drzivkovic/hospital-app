import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PostService } from "../post-service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post-model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  doctorName = '';
  patientName = '';
  treatment = '';
  post: Post;
  isloading = false;
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>
    {
      // check the page we are on
      if (paramMap.has('postId')) {
        // we are on edit page
        this.mode = 'edit';
        // set the this doctor id to the post id
        this.postId = paramMap.get('postId');
        // show loader
        this.isloading = true;
        // when we are on edit page and we refresh the page
        // get the doctor and all the data that we are edditing
        this.postsService.getPost(this.postId).subscribe((postData) =>{
          // remove loader
          this.isloading = false;
          // set this post to data the we got from getPost()
          this.post = {id: postData._id, doctorName: postData.doctorName, patientName: postData.patientName, treatment: postData.treatment};
        });
      }
      else {
        // we are on create page
        this.mode = 'create';
        // reset post id to null
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    // show loader
    this.isloading = true;

    // if we are on create page
    if (this.mode === 'create'){
      // add post with form data
      this.postsService.addPost(form.value.doctorName, form.value.patientName, form.value.treatment);
    } else {
      // we are on edit page
      // update the post with form data
      this.postsService.updatePost(this.postId, form.value.doctorName, form.value.patientName, form.value.treatment);
    }
    // reset the form
    form.resetForm();
  }
}
