import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';

export type ResolveFn<T> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<T>;

@Injectable()
export class CourseResolver {
  constructor(private service: CoursesService) {}

  resolve: ResolveFn<Course> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> => {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', category: '', lessons: [] });
  };
}
