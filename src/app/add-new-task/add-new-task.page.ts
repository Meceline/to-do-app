import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { TaskInterface } from '../taskInterface.interface';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage {

  categories = ['Work', 'Personal', 'Others'];

  taskPriority: string = '';
  taskName: string = '';
  taskCategory: string = '';
  taskDate: Date = new Date();

  task: TaskInterface = { value: { itemName: '', itemDueDate: new Date(), itemPriority: '', itemCategory: '' } };

  constructor(public modalCtrl: ModalController, public todoService: TodoService) { }

  async dismiss() {
    await this.modalCtrl.dismiss(this.task);
  }

  selectedCategory(index: number) {
    this.taskCategory = this.categories[index];
  }

  async addTask() {
    this.taskDate = new Date(this.taskDate);
  
    this.task = {
      value: {
        itemName: this.taskName || 'Unnamed Task',
        itemDueDate: this.taskDate,  
        itemPriority: this.taskPriority || 'Low',
        itemCategory: this.taskCategory || 'Others'
      }
    };
  
    // Créer un identifiant unique pour chaque tâche
    let uid = this.task.value.itemName + this.task.value.itemDueDate.toISOString();
    if (uid) {
      await this.todoService.addTask(uid, this.task);
    } else {
      console.log("Can't save an empty task");
    }
  
    this.dismiss();
  }
}