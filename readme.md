# Proyecto de Configuración con Spring Cloud Config JDBC y Angular

Este repositorio contiene dos proyectos:

1. **config-jdbc-server**  
   Servidor de configuración (Spring Cloud Config Server) que obtiene las propiedades desde una base de datos usando JDBC.

2. **angular-config-client**  
   Aplicación Angular que consume el servidor de configuración para obtener valores de propiedades específicas.

---

## 📂 Estructura del repositorio

.
├── config-jdbc-server/ # Proyecto Spring Boot Config Server con JDBC
└── angular-config-client/ # Cliente Angular que consume las propiedades

---

## 🚀 1. Configuración del Servidor (config-jdbc-server)

### Dependencias principales
En `pom.xml`:

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Configuración en application.properties

```
spring.application.name=config-jdbc-server
server.port=8888

spring.cloud.config.server.jdbc.sql=SELECT PROP_KEY, PROP_VALUE FROM PROPERTIES WHERE APPLICATION=? AND PROFILE=? AND LABEL=?
spring.datasource.url=jdbc:h2:mem:configdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
```

Creación de tabla y datos iniciales (schema.sql y data.sql)

```
CREATE TABLE IF NOT EXISTS PROPERTIES (
    ID VARCHAR(100) PRIMARY KEY,
    APPLICATION VARCHAR(50),
    PROFILE VARCHAR(50),
    LABEL VARCHAR(50),
    PROP_KEY VARCHAR(100),
    PROP_VALUE VARCHAR(200)
);

MERGE INTO PROPERTIES KEY(ID) VALUES 
('angular-app-default-title', 'angular-app', 'default', 'master', 'title', 'Angular application default'),
('angular-app-dev-title', 'angular-app', 'dev', 'master', 'title', 'Angular application develop'),
('angular-app-prod-title', 'angular-app', 'prod', 'master', 'title', 'Angular application');
```

### Ejecutar

```
cd config-jdbc-server
mvn spring-boot:run
```

### 2. Configuración del Cliente (angular-config-client)
Servicio para consumir Config Server (config.service.ts)

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configUrl = 'http://localhost:8888/angular-app/dev/master';

  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get<any>(this.configUrl);
  }
}
```

#### Uso en un componente (app.component.ts)

```
import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>`
})
export class AppComponent implements OnInit {
  title = '';

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.getConfig().subscribe(config => {
      this.title = config.propertySources[0].source.title;
    });
  }
}
```

#### Importar HttpClientModule en app.module.ts

```
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
#### Ejecutar
```
cd angular-config-client
npm install
ng serve
```

Ejemplo de uso en Angular
Si accedemos a http://localhost:4200, la aplicación mostrará el título configurado para el perfil dev desde la base de datos del Config Server.

#### Notas
Cambia el perfil (dev, prod, etc.) modificando la URL en ConfigService.
Asegúrate de que el config-jdbc-server esté corriendo antes de iniciar el cliente Angular.







