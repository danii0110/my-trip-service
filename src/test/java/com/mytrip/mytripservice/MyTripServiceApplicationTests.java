package com.mytrip.mytripservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
//테스트시 application-test.yml을 사용하도록 함
@ActiveProfiles("test")
class MyTripServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
