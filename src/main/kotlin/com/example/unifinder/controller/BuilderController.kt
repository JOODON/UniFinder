package com.example.unifinder.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping


@Controller
@RequestMapping("/uniFinder")
class BuilderController {

    @RequestMapping
    fun uniFinderHomeUI() : String = "UniFinderHome"


}