import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';
  private taskSource = new BehaviorSubject<any>(null);
  private tasks = new BehaviorSubject<Task[]>(this.loadTasks());
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Design homepage',
      description: 'Create wireframes.',
      priority: 'Urgent',
      status: 'Done',
      timeline: {
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-03-20')
      }
    },
    {
      id: 2,
      title: 'Develop API',
      description: 'Set up authentication.',
      priority: 'High',
      status: 'In Progress',
      timeline: {
        startDate: new Date('2025-03-21'),
        endDate: new Date('2025-03-25')
      }
    }
  ]);
  task$ = this.tasksSubject.asObservable();

  tasks$ = this.tasks.asObservable();
  currentTask = this.taskSource.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.tasks.next(this.loadTasks());
    }
  }

  setTask(task: any) {
    this.taskSource.next(task);
  }

  addTask(task: Task) {
    const updatedTasks = [...this.tasks.value, task];
    this.tasks.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  deleteTask(id: number) {
    const updatedTasks = this.tasks.value.filter(task => task.id !== id);
    this.tasks.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  private loadTasks(): Task[] {
    if (isPlatformBrowser(this.platformId)) {
      const storedTasks = localStorage.getItem(this.storageKey);
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    return [];
  }

  private saveTasks(tasks: Task[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  };
}
