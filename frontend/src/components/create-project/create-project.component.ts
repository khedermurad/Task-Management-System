import { Component, inject } from '@angular/core';
import { Project } from '../../model/project';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent {


  project: Project = new Project();

  projectService = inject(ProjectService);
  router = inject(Router)



  public onSubmit(){
    this.saveProject();
  }

  saveProject(){
    this.projectService.createProject(this.project).subscribe({
      next: (data) => {
        this.router.navigate(['/project', data.id]);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
