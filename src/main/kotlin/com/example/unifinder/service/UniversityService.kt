package com.example.unifinder.service

import com.example.unifinder.model.University
import org.springframework.stereotype.Service

@Service
class UniversityService {

    fun findUniversityByDepartment(department : String) =
        listOf(
            University("부천대학교","컴퓨터 소프트 웨어 학과"),
            University("부천대학교","컴퓨터 소프트 웨어 학과"),
        )
        

}