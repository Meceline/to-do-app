import { Injectable, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { TaskInterface } from './taskInterface.interface';


@Injectable({
  providedIn: 'root'
})
export class TodoService  {

  constructor(private storage: Storage) { 
    this.init();
  }

  addTask(key: string, value: any) {
    this.storage.set(key, value);
  }

  deleteTask(key: string) {
    this.storage.remove(key);
  }

  updateTask() {
  }  

  async getAllTasks(): Promise<TaskInterface[]> {
    let tasks: TaskInterface[] = [];
    await this.storage.forEach((value, key, index) => {
      tasks.push({ value: value });  // Stocke la valeur correctement formatée
    });
    return tasks;
  }

  async init(){
    await this.storage.create();
    //this.storage.clear();
  }
}
