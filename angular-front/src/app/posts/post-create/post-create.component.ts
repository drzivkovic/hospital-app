import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.componenet.css']
})
export class PostCreateComponent {
  doctorName = '';
  patientName = '';
  treatment = '';

  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post = {
      doctorName: this.doctorName,
      patientName: this.patientName,
      treatment: this.treatment
    };
    this.postCreated.emit(post);
  }
}
