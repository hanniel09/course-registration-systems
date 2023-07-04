package com.hanniel.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.hanniel.crudspring.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
  
}
