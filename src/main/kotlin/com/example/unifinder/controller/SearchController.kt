package com.example.unifinder.controller

import com.example.unifinder.service.UniversityService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class SearchController(
    @Autowired
    private val universityService: UniversityService
) {

    @GetMapping("/universities/{department}")
    fun findUniversitiesByDepartment(@PathVariable department : String) =
        try {
            val result = universityService.findUniversityByDepartment(department)
            ResponseEntity.ok(result)
        }catch (e : Exception){
            ResponseEntity.badRequest().body("해당 학과를 찾을수 없습니다.")
        }


}