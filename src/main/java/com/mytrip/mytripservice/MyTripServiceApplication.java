package com.mytrip.mytripservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MyTripServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyTripServiceApplication.class, args);
	}

}
