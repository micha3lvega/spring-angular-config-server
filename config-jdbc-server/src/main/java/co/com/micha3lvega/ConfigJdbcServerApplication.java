package co.com.micha3lvega;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class ConfigJdbcServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigJdbcServerApplication.class, args);
	}

}
