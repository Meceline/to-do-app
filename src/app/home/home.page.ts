import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import {TaskInterface} from '../taskInterface.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  toDoList: TaskInterface[] = []

  today: number = Date.now();

  constructor(public modalCtrl: ModalController, private todoService: TodoService) {
    this.getAllTasks();
  }

  async addTask(){
    const modal = await this.modalCtrl.create({ 
      component: AddNewTaskPage
    });

    modal.onDidDismiss().then((newTask) => {
      if (newTask.data) {
        this.toDoList.push(newTask.data);
      }
    });

    return await modal.present();
  }

  async getAllTasks(){
    this.toDoList = await this.todoService.getAllTasks();
  }

  delete(item: TaskInterface){
    let key = item.value.itemName + item.value.itemDueDate;
    this.todoService.deleteTask(key.toString());
    this.getAllTasks();
  }
}