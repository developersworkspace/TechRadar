import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: any = null;
  svg: any = null;

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit() {



    this.data = {
      quadrants: [],
      items: []
    };

    this.data.quadrants.push("Techniques");
    this.data.quadrants.push("Tools");
    this.data.quadrants.push("Platforms");
    this.data.quadrants.push("Languages and Frameworks");
    //["Adopt", "Trial", "Assess", "Hold"]

    this.updateItems();
    this.initializeChart();
    this.updateChart();

    setInterval(() => {
      this.updateItems();
      this.updateChart();
    }, 1000);

  }

  initializeChart() {

    let radius = 250;
    let width = radius * 2;
    let margin = { top: 20, right: 20, bottom: 40, left: 70 };
    let scale = d3.scaleLinear().range([0, radius]).domain([0, 100]);

    this.svg = d3.select(this.elementRef.nativeElement).select('svg');

    this.svg.attr('width', width + margin.left + margin.right)
      .attr('height', width + margin.top + margin.bottom)

    this.svg.append('line')
      .attr('y1', radius)
      .attr('x1', 0)
      .attr('y2', radius)
      .attr('x2', width)
      .attr('stroke', 'black');

    this.svg.append('line')
      .attr('x1', radius)
      .attr('y1', 0)
      .attr('x2', radius)
      .attr('y2', width)
      .attr('stroke', 'black');

    this.svg.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', scale(25))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    this.svg.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', scale(50))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    this.svg.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', scale(75))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    this.svg.append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', scale(100))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }

  updateChart() {

    let radius = 250;
    let width = radius * 2;
    let margin = { top: 20, right: 20, bottom: 40, left: 70 };
    let scale = d3.scaleLinear().range([0, radius]).domain([0, 100]);

    this.svg.selectAll('.point')
      .remove();

    this.svg.selectAll('.point')
      .data(this.data.items)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d: any) => {

        let value = Math.cos(this.toRadians(d.angle)) * scale(d.value);

        if (this.data.quadrants.indexOf(d.quadrant) == 0) {
          return radius - value;
        } else if (this.data.quadrants.indexOf(d.quadrant) == 1) {
          return radius + value;
        } else if (this.data.quadrants.indexOf(d.quadrant) == 2) {
          return radius - value;
        } else if (this.data.quadrants.indexOf(d.quadrant) == 3) {
          return radius + value;
        }

        return 0;
      })
      .attr('cy', (d: any) => {

        let value = Math.sin(this.toRadians(d.angle)) * scale(d.value);

        if (this.data.quadrants.indexOf(d.quadrant) == 0) {
          return radius - value;
        } else if (this.data.quadrants.indexOf(d.quadrant) == 1) {
          return radius - value;
        } else if (this.data.quadrants.indexOf(d.quadrant) == 2) {
          return radius + value;
        } else if (this.data.quadrants.indexOf(d.quadrant) == 3) {
          return radius + value;
        }

        return 0;
      })
      .attr('r', 5)
      .attr('fill', (d: any) => {
        if (this.data.quadrants.indexOf(d.quadrant) == 0) {
          return 'blue';
        } else if (this.data.quadrants.indexOf(d.quadrant) == 1) {
          return 'green';
        } else if (this.data.quadrants.indexOf(d.quadrant) == 2) {
          return 'red';
        } else if (this.data.quadrants.indexOf(d.quadrant) == 3) {
          return 'purple';
        }
      });
  }

  updateItems() {

    this.data.items = [];

    for (let i = 0; i < Math.round(Math.random() * 150); i++) {

      let angle = Math.random() * 90;

      this.data.items.push({
        name: "Demo",
        quadrant: "Techniques",
        value: Math.random() * 100,
        angle: angle
      });
    }

    for (let i = 0; i < Math.round(Math.random() * 150); i++) {

      let angle = Math.random() * 90;

      this.data.items.push({
        name: "Demo",
        quadrant: "Tools",
        value: Math.random() * 100,
        angle: angle
      });
    }

    for (let i = 0; i < Math.round(Math.random() * 150); i++) {

      let angle = Math.random() * 90;

      this.data.items.push({
        name: "Demo",
        quadrant: "Platforms",
        value: Math.random() * 100,
        angle: angle
      });
    }

    for (let i = 0; i < Math.round(Math.random() * 150); i++) {

      let angle = Math.random() * 90;

      this.data.items.push({
        name: "Demo",
        quadrant: "Languages and Frameworks",
        value: Math.random() * 100,
        angle: angle
      });
    }
  }

  toDegrees(angle: number) {
    return angle * (180 / Math.PI);
  }

  toRadians(degrees: number) {
    return degrees * Math.PI / 180;
  };
}
