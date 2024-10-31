import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  httpClient = inject(HttpClient);

  private baseURL = 'http://localhost:8080/api/projects';

  constructor() {}

  getProjectList(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.baseURL}`);
  }
}
