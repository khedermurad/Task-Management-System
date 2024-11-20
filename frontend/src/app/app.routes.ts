import { Routes } from '@angular/router';
import { ProjectListComponent } from '../components/project-list/project-list.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { CreateProjectComponent } from '../components/create-project/create-project.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectListComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { path: 'create-project', component: CreateProjectComponent}
];
