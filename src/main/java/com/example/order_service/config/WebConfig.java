package com.example.order_service.config; // ✅ adjust this if your package is different

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
@Configuration
public class WebConfig implements WebMvcConfigurer {
	  public WebConfig() {
	        System.out.println("✅ WebConfig loaded!");
	    }
	  

	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**") // Allow all endpoints
	                .allowedOrigins("http://localhost:3000") // React frontend
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                .allowedHeaders("*");
	    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	  String uploadPath = System.getProperty("user.dir") + "/uploads/";
          System.out.println("✅ Serving static files from: " + uploadPath);

          registry.addResourceHandler("/uploads/**")
                  .addResourceLocations("file:" + uploadPath);
    }
}
