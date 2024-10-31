import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Project } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatIconModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projects!: Project[];

  projectService = inject(ProjectService);
  snackbar = inject(MatSnackBar)

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects() {
    this.projectService.getProjectList().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.log('Error when retrieving projects data', err);
      },
    });
  }

  public handleClick(name: String){
    this.snackbar.open(`Name: ${name}`, 'Schließen', {
      duration: 3000,  // Zeit in Millisekunden
    });
  }

  public deleteProject(){
    
  }

}
