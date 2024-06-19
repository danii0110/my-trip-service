package com.mytrip.mytripservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.io.File;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MyTripServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyTripServiceApplication.class, args);
	}
}
