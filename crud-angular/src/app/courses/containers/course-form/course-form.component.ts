import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule]
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService){
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [ Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLesson(course), Validators.required)
      });
    }


  private retrieveLesson(course: Course){
    const lessons = [];
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {_id: '', name: '', youtubeUrl: ''}): any {
      return this.formBuilder.group(
        {
          _id: [lesson._id],
          name: [lesson.name , [ Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100)]],
          youtubeUrl: [lesson.youtubeUrl, [ Validators.required,
            Validators.minLength(10),
            Validators.maxLength(11)]]
        }
      )
  }

  getLessonsFormArray(){
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }
  addNewLesson(){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }
  removeLesson(index: number){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit(){
    if(this.form.valid){
    this.service.save(this.form.value).subscribe({
      next: (onSucess) => this.onSucess(),
      error: () =>{
        this.onError();
      },
     });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
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
