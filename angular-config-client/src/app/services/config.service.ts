import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configServerUrl = 'http://localhost:8888'; // URL de tu config server
  private appName = 'angular-app';
  private profile = 'dev'; // o 'default', según necesites

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Record<string, any>> {
    return this.http
      .get<any>(`${this.configServerUrl}/${this.appName}/${this.profile}`)
      .pipe(
        map(response => {
          // Combinar todas las sources en un solo objeto
          return response.propertySources
            .map((ps: any) => ps.source)
            .reduce((acc: any, source: any) => ({ ...acc, ...source }), {});
        })
      );
  }

  getProperty(key: string): Observable<any> {
    return this.getAllProperties().pipe(
      map(props => props[key])
    );
  }
}
