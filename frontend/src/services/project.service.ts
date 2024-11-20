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

  deleteProject(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.baseURL}/${id}`);
  }

  updateProject(id: number, project: Project): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, project);
  }

  createProject(project: Project): Observable<Project>{
    return this.httpClient.post<Project>(`${this.baseURL}`, project);
  }
  
}
