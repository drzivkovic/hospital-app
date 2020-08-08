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
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isloading = true;
        this.postsService.getPost(this.postId).subscribe((postData) =>{
          this.isloading = false;
          this.post = {id: postData._id, doctorName: postData.doctorName, patientName: postData.patientName, treatment: postData.treatment};
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    this.isloading = true;
    if (this.mode === 'create'){
      this.postsService.addPost(form.value.doctorName, form.value.patientName, form.value.treatment);
    } else {
      this.postsService.updatePost(this.postId, form.value.doctorName, form.value.patientName, form.value.treatment);
    }
    form.resetForm();
  }
}
