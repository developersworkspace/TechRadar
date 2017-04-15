# Tech Radar Chart

`npm install tech-radar-chart --save`

Example Usage:

```html
<techradar-chart 
    [data]="data"
    [radius]="400"
    (onHover)="onHover($event)"
    (onMouseLeave)="onMouseLeave($event)"
    (onClick)="onClick($event)">
</techradar-chart>
```

Where:

`data` is an object.

```json
{
    "quadrants": ["Techniques", "Tools", "Platforms", "Languages and Frameworks"],
    "items": [{
        "id": "1ec46d50-fcc0-11e6-bc64-92361f002671",
        "name": "Redis",
        "quadrant": "Languages and Frameworks",
        "value": 30,
        "angle": 52
      }]
}
```
