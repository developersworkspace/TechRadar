import { Component } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tech Radar';

  public data: any = null;

  constructor() {

    this.data = {
      quadrants: [],
      items: []
    };

    this.data.quadrants.push("Techniques");
    this.data.quadrants.push("Tools");
    this.data.quadrants.push("Platforms");
    this.data.quadrants.push("Languages and Frameworks");

    // setInterval(() => {
    //   this.updateItems();
    // }, 1000);

    this.updateItems();
  }

  updateItems() {

    let numberOfItems = 20;

    let randomData = [
      'Redis',
      'Mongo',
      'CouchDB',
      'SQL',
      'Micro Services',
      'Node JS',
      'Angular 2',
      'C#',
      'D3',
      'Cloud',
      'Automation',
      'Continous Delivery'
    ];
    this.data.items = [];

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

      let angle = Math.random() * 90;

      let name = randomData[Math.floor(Math.random() * randomData.length)];

      this.data.items.push({
        id: uuid.v4(),
        name: name,
        quadrant: "Techniques",
        value: Math.random() * 100,
        angle: angle
      });
    }

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

      let angle = Math.random() * 90;

      let name = randomData[Math.floor(Math.random() * randomData.length)];

      this.data.items.push({
        id: uuid.v4(),
        name: name,
        quadrant: "Tools",
        value: Math.random() * 100,
        angle: angle
      });
    }

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

      let angle = Math.random() * 90;

      let name = randomData[Math.floor(Math.random() * randomData.length)];

      this.data.items.push({
        id: uuid.v4(),
        name: name,
        quadrant: "Platforms",
        value: Math.random() * 100,
        angle: angle
      });
    }

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

      let angle = Math.random() * 90;

      let name = randomData[Math.floor(Math.random() * randomData.length)];

      this.data.items.push({
        id: uuid.v4(),
        name: name,
        quadrant: "Languages and Frameworks",
        value: Math.random() * 100,
        angle: angle
      });
    }
  }

}
