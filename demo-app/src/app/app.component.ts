import { Component } from '@angular/core';

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

    let techniquesData = [
      'Consumer-driven contract testing',
      'Pipelines as code',
      'Threat Modeling',
      'APIs as a product',
      'Bug bounties',
      'Data Lake',
      'Hosting PII data in the EU',
      'Client-directed query',
      'Micro frontends',
      'Unikernels',
      'VR beyond gaming',
      'Cloud lift and shift'
    ];


    let toolsData = [
      'Babel',
      'Consul',
      'Packer',
      'Apache Kafka',
      'HashiCorp Vault',
      'Let\'s Encrypt',
      'Terraform',
      'Webpack',
      'Pinpoint',
      'Jenkins as a deployment pipeline'
    ];


    let d1 = techniquesData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Techniques",
        value: Math.random() * 100,
        angle: Math.random() * 90
      };
    });

    let d2 = toolsData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Tools",
        value: Math.random() * 100,
        angle: Math.random() * 90
      };
    });


    let d3 = techniquesData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Platforms",
        value: Math.random() * 100,
        angle: Math.random() * 90
      };
    });

    let d4 = toolsData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Languages and Frameworks",
        value: Math.random() * 100,
        angle: Math.random() * 90
      };
    });

    this.data.items = d1.concat(d2).concat(d3).concat(d4);


  }


  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
