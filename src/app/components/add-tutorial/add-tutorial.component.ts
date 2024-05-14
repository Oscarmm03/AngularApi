import { Component } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    name: '',
    price: 0,
    extended_description: '',
    category: '',
    sale: false,
    image: ''
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}


  saveTutorial(): void {
    const data = {
      name: this.tutorial.name,
      price: this.tutorial.price,
      extended_description: this.tutorial.extended_description,
      category: this.tutorial.category,
      sale: this.tutorial.sale,
      image: this.tutorial.image
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      name: '',
      price: 0,
      extended_description: '',
      category: '',
      sale: false,
      image: ''
    };
  }
}
