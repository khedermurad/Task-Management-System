import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
  CdkDropListGroup,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Project } from '../../model/project';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    CdkDropListGroup,
    CdkDropList,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  id!: number;

  project: Project = {
    id: 0,
    name: '',
    startDate: null,
    endDate: null,
    tasks: [], // Leeres Array als Standardwert
  };

  projectService = inject(ProjectService);

  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.project = new Project();

    this.projectService.getProjectById(this.id).subscribe({
      next: (data) => {
        this.project = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTasksByStatus(status: string): Task[] {
    return this.project.tasks
      ? this.project.tasks.filter(
          (task) => task.status === status.replace(' ', '_'),
        )
      : [];
  }

  addTask(status: string) {
    const taskToAdd: Task = {
      description: 'new task',
      status: status.replace(' ', '_'),
      projectId: this.id,
    };

    this.project.tasks.push(taskToAdd);

    this.projectService.updateProject(this.id, this.project).subscribe({
      next: () => console.log('Task hinzugefügt'),
      error: (err) => console.error('Fehler beim Hinzufügen des Tasks:', err),
    });
  }

  deleteTask(task: Task) {
    const index = this.project.tasks.indexOf(task);
    if (index > -1) {
      this.project.tasks.splice(index, 1);

      this.projectService.updateProject(this.id, this.project).subscribe({
        next: () => console.log('Task gelöscht'),
        error: (err) => console.error('Fehler beim Löschen des Tasks:', err),
      });
    }
  }

  editTask(task: Task) {
    const newDescription = prompt(
      'Bearbeiten Sie den Task-Titel:',
      task.description,
    );
    if (newDescription) {
      task.description = newDescription;
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log('Drop Event:', event);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedTask = event.container.data[event.currentIndex];
      movedTask.status = this.getColumnStatus(event.container.id);
    }
    this.onProjectChange();
  }

  getColumnStatus(containerId: string): string {
    const statusMapping: Record<string, string> = {
      PENDING: 'PENDING',
      'IN PROGRESS': 'IN_PROGRESS',
      DONE: 'DONE',
    };

    return statusMapping[containerId] || 'UNKNOWN';
  }

  public onProjectChange() {
    console.log('Request Payload:', this.project);
    this.projectService.updateProject(this.id, this.project).subscribe({
      next: (data) => {
        console.log('Projekt erfolgreich aktualisiert:', data);
      },
      error: (err) => {
        console.error('Fehler beim Aktualisieren des Projekts:', err);
      },
    });
  }

  adjustInputWidth(inputElement: HTMLInputElement): void {
    // Setzt die Breite des Inputs basierend auf dem Textinhalt
    inputElement.style.width = `${inputElement.value.length + 1}ch`;
  }
}
