import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  id!: number;

  project = {
    name: 'Projektname',
    startDate: new Date(),
    endDate: new Date()
  };

  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id']; // Ensure id is a number
  }

  columns = [
    { name: 'Pending', tasks: [{ title: 'Task 1' }, { title: 'Task 2' }] },
    { name: 'In Progress', tasks: [] },
    { name: 'Done', tasks: [] }
  ];

  addTask(column: { name: string; tasks: { title: string }[] }) {
    const taskTitle = prompt('Geben Sie den Task-Titel ein:');
    if (taskTitle) {
      column.tasks.push({ title: taskTitle });
    }
  }

  editTask(task: { title: string }) {
    const newTitle = prompt('Bearbeiten Sie den Task-Titel:', task.title);
    if (newTitle) {
      task.title = newTitle;
    }
  }

  deleteTask(task: { title: string }, column: { name: string; tasks: { title: string }[] }) {
    const index = column.tasks.indexOf(task);
    if (index > -1) {
      column.tasks.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<{ title: string }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
