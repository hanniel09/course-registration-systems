import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(){
    /*Empty*/
  }

  ngOnInit(): void {
      /*Empty*/
  }

  onAdd(){
    this.add.emit(true);
  }
}
