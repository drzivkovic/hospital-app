import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.componenet.css']
})
export class PostCreateComponent {
  doctorName = '';
  patientName = '';
  treatment = '';

  constructor(public postsService: PostService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) return;

    this.postsService.addPost(form.value.doctorName, form.value.patientName, form.value.treatment);
  }
}
