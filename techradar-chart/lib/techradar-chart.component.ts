import { Component, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'techradar-chart',
  templateUrl: './techradar-chart.component.html'
  //styleUrls: ['./app.component.css']
})
export class TechRadarCompoment {

  @Input()
  public data: any = null;
  
  private dataset: any = null;
  private svg: any = null;
  private radius: number;
  private width: number;
  private margin: any;
  private scale: any;

  private isInitialized = false;

  constructor(private elementRef: ElementRef) {
    this.radius = 250;
    this.margin = { top: 20, right: 150, bottom: 20, left: 150 };
    this.scale = d3.scaleLinear().range([0, this.radius]).domain([0, 100]);
    this.width = this.radius * 2;
  }


 ngOnChanges(changes: any) {
    
    if (!this.isInitialized) {
      this.initializeChart();
    }

    this.dataset = changes.data.currentValue;
  }


  ngAfterViewInit() {
      
  }

  ngDoCheck() {
     this.updateChart();
     this.updateLegend();
  }

 

  initializeChart() {

    this.svg = d3.select(this.elementRef.nativeElement).select('svg');

    // Set svg width and height
    this.svg.attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.width + this.margin.top + this.margin.bottom);

    // Draw x-axis
    this.svg.append('line')
      .attr('y1', this.radius + this.margin.top)
      .attr('x1', 0 + this.margin.left)
      .attr('y2', this.radius + this.margin.top)
      .attr('x2', this.width + this.margin.left)
      .attr('stroke', 'black');

    // Draw y-axis
    this.svg.append('line')
      .attr('x1', this.radius + this.margin.left)
      .attr('y1', 0 + this.margin.top)
      .attr('x2', this.radius + this.margin.left)
      .attr('y2', this.width + this.margin.top)
      .attr('stroke', 'black');

    // Draw 'Adopt' boundary
    this.svg.append('circle')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(25))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw 'Trial' boundary
    this.svg.append('circle')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(50))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw 'Assess' boundary
    this.svg.append('circle')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(75))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw 'Hold' boundary
    this.svg.append('circle')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(100))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }

  updateChart() {


    // Remove all points
    this.svg.selectAll('.point')
      .remove();

    // Draw points
    this.svg.selectAll('.point')
      .data(this.dataset.items)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d: any) => {

        let value = Math.cos(this.toRadians(d.angle)) * this.scale(d.value);

        if (this.dataset.quadrants.indexOf(d.quadrant) == 0) {
          return this.radius - value + this.margin.left;
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 1) {
          return this.radius + value + this.margin.left;
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 2) {
          return this.radius - value + this.margin.left;
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 3) {
          return this.radius + value + this.margin.left;
        }

        throw new Error('Invalid quadrant');
      })
      .attr('cy', (d: any) => {

        let value = Math.sin(this.toRadians(d.angle)) * this.scale(d.value);

        if (this.dataset.quadrants.indexOf(d.quadrant) == 0) {
          return this.radius - value + this.margin.top;
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 1) {
          return this.radius - value + this.margin.top;
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 2) {
          return this.radius + value + this.margin.top;
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 3) {
          return this.radius + value + this.margin.top;
        }

        throw new Error('Invalid quadrant');
      })
      .attr('r', 5)
      .attr('fill', (d: any) => {
        if (this.dataset.quadrants.indexOf(d.quadrant) == 0) {
          return '#1ebccd';
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 1) {
          return '#86b782';
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 2) {
          return '#f38a3e';
        } else if (this.dataset.quadrants.indexOf(d.quadrant) == 3) {
          return '#b32059';
        }

        throw new Error('Invalid quadrant');
      });
  }

  updateLegend() {

    // Remove all labels
    this.svg.selectAll('.labels')
      .remove();

    // Draw labels for quadrant 1
    this.svg.selectAll('.labels.quadrant1')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[0]))
      .enter()
      .append('text')
      .attr('class', 'labels quadrant1')
      .attr('x', (d: any, i: number) => {
        return 15;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      });



    // Draw labels for quadrant 2
    this.svg.selectAll('.labels.quadrant2')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[1]))
      .enter()
      .append('text')
      .attr('class', 'labels quadrant2')
      .attr('x', (d: any, i: number) => {
        return 15 + this.margin.left + this.width;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      });


    // Draw labels for quadrant 3
    this.svg.selectAll('.labels.quadrant3')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[2]))
      .enter()
      .append('text')
      .attr('class', 'labels quadrant3')
      .attr('x', (d: any, i: number) => {
        return 15;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      });

    // Draw labels for quadrant 4
    this.svg.selectAll('.labels.quadrant4')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[3]))
      .enter()
      .append('text')
      .attr('class', 'labels quadrant4')
      .attr('x', (d: any, i: number) => {
        return 15 + this.margin.left + this.width;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      });

    // Remove all icons
    this.svg.selectAll('.icon')
      .remove();

    // Draw icons for quadrant 1
    this.svg.selectAll('.icon.quadrant1')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[0]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant1')
      .attr('cx', (d: any, i: number) => {
        return 5;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return '#1ebccd';
      });

    // Draw icons for quadrant 2
    this.svg.selectAll('.icon.quadrant2')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[1]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant2')
      .attr('cx', (d: any, i: number) => {
        return this.margin.left + this.width + 5;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return '#86b782';
      });

    // Draw icons for quadrant 3
    this.svg.selectAll('.icon.quadrant3')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[2]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant3')
      .attr('cx', (d: any, i: number) => {
        return 5;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return '#f38a3e';
      });


    // Draw icons for quadrant 4
    this.svg.selectAll('.icon.quadrant4')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[3]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant4')
      .attr('cx', (d: any, i: number) => {
        return this.margin.left + this.width + 5;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return '#b32059';
      });

  }

  toDegrees(angle: number) {
    return angle * (180 / Math.PI);
  }

  toRadians(degrees: number) {
    return degrees * Math.PI / 180;
  };
}
