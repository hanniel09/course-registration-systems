import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location){
  }

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
  onSubmit(){
    this.service.save(this.form.value).subscribe({
      next: (onSucess) => this.onSucess(),
      error: () =>{
        this.onError();
      },
     });
  }

  onCancel(){
    this.location.back();
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Error ao salvar curso.', '', { duration: 5000});
  }
}
