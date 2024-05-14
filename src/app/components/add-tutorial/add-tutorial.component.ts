import { Component } from '@angular/core';
//import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Tutorial {
  name: string;
  price: number;
  extended_description: string;
  category: string;
  sale: boolean;
  image: string;
}

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

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    extended_description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    sale: new FormControl(''),
    image: new FormControl(''),
  });

  f = this.form.controls;

  constructor(private tutorialService: TutorialService) { }


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

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.saveTutorial();

    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
