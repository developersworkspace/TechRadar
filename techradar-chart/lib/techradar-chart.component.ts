import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'techradar-chart',
  templateUrl: './techradar-chart.component.html'
})
export class TechRadarCompoment {

  @Input()
  public data: any = null;

  @Input()
  public radius: number = 300;


  @Output() 
  onHover = new EventEmitter();

  @Output() 
  onMouseLeave = new EventEmitter();

  private dataset: any = null;
  private svg: any = null;
  private width: number;
  private margin: any;
  private scale: any;

  private doDrawTechRadar = true;

  constructor(private elementRef: ElementRef) {

  }

  ngOnChanges(changes: any) {

    this.dataset = changes.data.currentValue;

    this.doDrawTechRadar = true;
  }

  ngAfterViewInit() {

  }

  ngDoCheck() {
    if (this.doDrawTechRadar) {
      this.drawTechRadar();
      this.doDrawTechRadar = false;
    }
  }

  private drawTechRadar() {

    this.margin = { top: 20, right: 250, bottom: 20, left: 250 };
    this.scale = d3.scaleLinear().range([0, this.radius]).domain([0, 100]);
    this.width = this.radius * 2;

    this.svg = d3.select(this.elementRef.nativeElement).select('svg');

    // Set svg width and height
    this.svg.attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.width + this.margin.top + this.margin.bottom);

    this.drawAxis();
    this.drawBoundaryLines();
    this.drawBoundaryText();

    this.drawPoints();
    this.drawLegend();

  }

  private drawAxis() {

    // Remove all axis
    this.svg.selectAll('.axis')
      .remove();

    // Draw x-axis
    this.svg.append('line')
      .attr('class', 'axis')
      .attr('y1', this.radius + this.margin.top)
      .attr('x1', 0 + this.margin.left)
      .attr('y2', this.radius + this.margin.top)
      .attr('x2', this.width + this.margin.left)
      .attr('stroke', 'black');

    // Draw y-axis
    this.svg.append('line')
      .attr('class', 'axis')
      .attr('x1', this.radius + this.margin.left)
      .attr('y1', 0 + this.margin.top)
      .attr('x2', this.radius + this.margin.left)
      .attr('y2', this.width + this.margin.top)
      .attr('stroke', 'black');
  }

  private drawBoundaryLines() {

    // Remove all boundary lines
    this.svg.selectAll('.boundary-line')
      .remove();

    // Draw 'Adopt' boundary
    this.svg.append('circle')
      .attr('class', 'boundary-line')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(25))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw 'Trial' boundary
    this.svg.append('circle')
      .attr('class', 'boundary-line')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(50))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw 'Assess' boundary
    this.svg.append('circle')
      .attr('class', 'boundary-line')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(75))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // Draw 'Hold' boundary
    this.svg.append('circle')
      .attr('class', 'boundary-line')
      .attr('cx', this.radius + this.margin.left)
      .attr('cy', this.radius + this.margin.top)
      .attr('r', this.scale(100))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }

  private drawBoundaryText() {

    // Remove all boundary text
    this.svg.selectAll('.boundary-text')
      .remove();

    // Draw 'Adopt' boundary text
    this.svg.append('text')
      .attr('class', 'boundary-text')
      .attr('x', this.radius + this.margin.left + 5)
      .attr('y', this.radius + this.margin.top - this.scale(25) - 5)
      .text('Adopt');


    // Draw 'Trial' boundary text
    this.svg.append('text')
      .attr('class', 'boundary-text')
      .attr('x', this.radius + this.margin.left + 5)
      .attr('y', this.radius + this.margin.top - this.scale(50) - 5)
      .text('Trial');

    // Draw 'Assess' boundary text
    this.svg.append('text')
      .attr('class', 'boundary-text')
      .attr('x', this.radius + this.margin.left + 5)
      .attr('y', this.radius + this.margin.top - this.scale(75) - 5)
      .text('Assess');

    // Draw 'Hold' boundary text
    this.svg.append('text')
      .attr('class', 'boundary-text')
      .attr('x', this.radius + this.margin.left + 5)
      .attr('y', this.radius + this.margin.top - this.scale(100) - 5)
      .text('Hold');
  }

  private drawPoints() {

    // Remove all points
    this.svg.selectAll('.point')
      .remove();

    if (this.dataset == null || this.dataset.items == null || this.dataset.items.length == 0) {
      return;
    }

    // Draw points
    this.svg.selectAll('.point')
      .data(this.dataset.items)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d: any) => {

        let value = Math.cos(this.toRadians(d.angle)) * this.scale(d.value);

        let quadrant = this.findQuadrant(d);

        switch (quadrant) {
          case 1: {
            return this.radius - value + this.margin.left;
          }
          case 2: {
            return this.radius + value + this.margin.left;
          }
          case 3: {
            return this.radius - value + this.margin.left;
          }
          case 4: {
            return this.radius + value + this.margin.left;
          }
        }
      })
      .attr('cy', (d: any) => {

        let value = Math.sin(this.toRadians(d.angle)) * this.scale(d.value);

        let quadrant = this.findQuadrant(d);

        switch (quadrant) {
          case 1: {
            return this.radius - value + this.margin.top;
          }
          case 2: {
            return this.radius - value + this.margin.top;
          }
          case 3: {
            return this.radius + value + this.margin.top;
          }
          case 4: {
            return this.radius + value + this.margin.top;
          }
        }
      })
      .attr('r', 5)
      .attr('fill', (d: any) => {
        return this.findQuadrantColor(d);
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      })
      .on('mouseover', (d: any, i: number) => {
        this.on_mouseover(d);
      })
      .on('mouseout', (d: any, i: number) => {
        this.on_mouseout(d);
      });
  }

  private drawLegend() {

    // Remove all labels
    this.svg.selectAll('.labels')
      .remove();

    // Remove all icons
    this.svg.selectAll('.icon')
      .remove();

    if (this.dataset == null || this.dataset.items == null || this.dataset.items.length == 0) {
      return;
    }

    // Draw labels for quadrant 1
    this.svg.selectAll('.label.quadrant1')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[0]))
      .enter()
      .append('text')
      .attr('class', 'label quadrant1')
      .attr('x', (d: any, i: number) => {
        return 25;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      })
      .attr('id', (d, i) => {
        return 'item-' + d.id;
      });

    // Draw labels for quadrant 2
    this.svg.selectAll('.label.quadrant2')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[1]))
      .enter()
      .append('text')
      .attr('class', 'label quadrant2')
      .attr('x', (d: any, i: number) => {
        return 25 + this.margin.left + this.width;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      });

    // Draw labels for quadrant 3
    this.svg.selectAll('.label.quadrant3')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[2]))
      .enter()
      .append('text')
      .attr('class', 'label quadrant3')
      .attr('x', (d: any, i: number) => {
        return 25;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      });

    // Draw labels for quadrant 4
    this.svg.selectAll('.label.quadrant4')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[3]))
      .enter()
      .append('text')
      .attr('class', 'label quadrant4')
      .attr('x', (d: any, i: number) => {
        return 25 + this.margin.left + this.width;
      })
      .attr('y', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top;
      })
      .text((d: any, i: number) => {
        return d.name;
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      });


    // Draw icons for quadrant 1
    this.svg.selectAll('.icon.quadrant1')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[0]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant1')
      .attr('cx', (d: any, i: number) => {
        return 10;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return this.findQuadrantColor(d);
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      })
      .on('mouseover', (d: any, i: number) => {
        this.on_mouseover(d);
      })
      .on('mouseout', (d: any, i: number) => {
        this.on_mouseout(d);
      });

    // Draw icons for quadrant 2
    this.svg.selectAll('.icon.quadrant2')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[1]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant2')
      .attr('cx', (d: any, i: number) => {
        return this.margin.left + this.width + 10;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return this.findQuadrantColor(d);
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      })
      .on('mouseover', (d: any, i: number) => {
        this.on_mouseover(d);
      })
      .on('mouseout', (d: any, i: number) => {
        this.on_mouseout(d);
      });

    // Draw icons for quadrant 3
    this.svg.selectAll('.icon.quadrant3')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[2]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant3')
      .attr('cx', (d: any, i: number) => {
        return 10;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return this.findQuadrantColor(d);
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      })
      .on('mouseover', (d: any, i: number) => {
        this.on_mouseover(d);
      })
      .on('mouseout', (d: any, i: number) => {
        this.on_mouseout(d);
      });


    // Draw icons for quadrant 4
    this.svg.selectAll('.icon.quadrant4')
      .data(this.dataset.items.filter(x => x.quadrant == this.dataset.quadrants[3]))
      .enter()
      .append('circle')
      .attr('class', 'icon quadrant4')
      .attr('cx', (d: any, i: number) => {
        return this.margin.left + this.width + 10;
      })
      .attr('cy', (d: any, i: number) => {
        return (18 * i) + this.margin.top + this.radius + this.margin.top - 5;
      })
      .attr('r', 4)
      .attr('fill', (d: any) => {
        return this.findQuadrantColor(d);
      })
      .attr('id', (d: any, i: number) => {
        return 'item-' + d.id;
      })
      .on('mouseover', (d: any, i: number) => {
        this.on_mouseover(d);
      })
      .on('mouseout', (d: any, i: number) => {
        this.on_mouseout(d);
      });

  }

  private on_mouseover(item: any) {

    if (item == null) {
      return;
    }

    this.onHover.emit(item);

    d3.select('#item-' + item.id + '.point').attr('r', '7');
    d3.select('#item-' + item.id + '.icon').attr('r', '7');
    d3.select('#item-' + item.id + '.label').attr('fill', this.findQuadrantColor(item));
  }

  private on_mouseout(item: any) {

    if (item == null) {
      return;
    }

    this.onMouseLeave.emit(item);

    d3.select('#item-' + item.id + '.point').attr('r', '4');
    d3.select('#item-' + item.id + '.icon').attr('r', '4');
    d3.select('#item-' + item.id + '.label').attr('fill', 'black');
  }

  private findQuadrantColor(item: any) {

    if (item == null) {
      return 'black';
    }

    let quadrant = this.findQuadrant(item);

    switch (quadrant) {
      case 1: {
        return '#1ebccd';
      }
      case 2: {
        return '#86b782';
      }
      case 3: {
        return '#f38a3e';
      }
      case 4: {
        return '#b32059';
      }
    }
  }

  private findQuadrant(item: any) {
    if (this.dataset.quadrants.indexOf(item.quadrant) == 0) {
      return 1;
    } else if (this.dataset.quadrants.indexOf(item.quadrant) == 1) {
      return 2;
    } else if (this.dataset.quadrants.indexOf(item.quadrant) == 2) {
      return 3;
    } else if (this.dataset.quadrants.indexOf(item.quadrant) == 3) {
      return 4;
    }

    throw new Error('Could not find specified quadrant.');
  }

  private toDegrees(angle: number) {
    return angle * (180 / Math.PI);
  }

  private toRadians(degrees: number) {
    return degrees * Math.PI / 180;
  };
}
