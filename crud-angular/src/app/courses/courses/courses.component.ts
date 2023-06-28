import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService){
    // this.coursesService = new CoursesService();
    this.courses = this.coursesService.list();
  }

  ngOnInit(): void {}
}
