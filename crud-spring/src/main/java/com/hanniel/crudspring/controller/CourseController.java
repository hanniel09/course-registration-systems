package com.hanniel.crudspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hanniel.crudspring.model.Course;
import com.hanniel.crudspring.repository.CourseRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

  @Autowired
  private final CourseRepository courseRepository;

  @GetMapping
  public @ResponseBody List<Course> list() {
    return courseRepository.findAll();
  }
}
