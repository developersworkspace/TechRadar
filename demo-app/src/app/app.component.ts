import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TechRadar Demo App by Developer\'s Workspace';

  public data: any = null;
  public selectedItem: any = null;

  constructor() {

    this.data = {
      quadrants: [],
      items: []
    };

    this.data.quadrants.push("Techniques");
    this.data.quadrants.push("Tools");
    this.data.quadrants.push("Platforms");
    this.data.quadrants.push("Languages and Frameworks");

    this.initializeData();
  }

  onHover(item: any) {
    this.selectedItem = item;
  }

  onMouseLeave(item: any) {
    this.selectedItem = null;
  }

  initializeData() {

    let techniquesData = ["Git flow / Pull Requests", "Incremental data warehousing", "Events for messages - CQRS", "Measure Pipeline disruptions", "Continuous Experimentation", "Reduce iRules dependence", "SaaS for non-core systems", "Pair Programming", "iOS Accessibility", "Single Page App", "iOS Adaptivity", "Build Pipelines", "Data Informed Decion Making", "Polygot Programming", "internal load balancing off F5", "Isolated dev envs", "Edge Services"];

    let toolsData = ["Docker", "bind", "Appium", "Android Studio", "Responsive Android", "AutoLayout - iOS", "Kiwi - iOS unit test", "BEM", "Crashlytics", "Consul", "Swagger Code-Gen", "PowerMock", "Mockito", "Json Web Tokens (JWT)", "Lemming", "Hystrix"];

    let platformsData = ["OpenId Connect", "Location based services", "Openstack", "RHEL 7", "App containers", "Google Cloud Data Flow", "Postgres as NoSQL", "AWS 2014 Innovations", "Azure", "Mesos", "Marathon", "Kubernetes", "Google App Engine", "Google as corporate platform", "Google Play - (alpha/beta builds)"];

    let languagesFrameworksData = ["CDI", "Jersey", "Guice", "RxJava", "Java 8", "Groovy", "Swift", "Scala - the good parts", "Serverside Javascript", "Coffeescript", "Functional Reactive Programming", "Clojure", "RxJs", "Web Components", "Mustache/Handlebars template"];


    let d1 = techniquesData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Techniques",
        value: Math.random() * 100,
        angle: Math.random() * 90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu pretium ligula, sed pretium diam. Suspendisse commodo odio ac ligula mollis, sed condimentum ante finibus. Fusce quis sollicitudin augue. Vestibulum sed sem mauris. Curabitur ac tincidunt eros, vel maximus nunc. Fusce porta feugiat lacinia. Phasellus interdum, sem sed pharetra congue, dolor libero pretium est, eu tempor ipsum lorem sed mi. Suspendisse dignissim dui ut pulvinar egestas. Pellentesque urna eros, gravida in maximus eget, euismod at libero. Praesent hendrerit lacus in odio sodales, at ultricies turpis molestie. Sed mattis risus vel egestas semper."
      };
    });

    let d2 = toolsData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Tools",
        value: Math.random() * 100,
        angle: Math.random() * 90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu pretium ligula, sed pretium diam. Suspendisse commodo odio ac ligula mollis, sed condimentum ante finibus. Fusce quis sollicitudin augue. Vestibulum sed sem mauris. Curabitur ac tincidunt eros, vel maximus nunc. Fusce porta feugiat lacinia. Phasellus interdum, sem sed pharetra congue, dolor libero pretium est, eu tempor ipsum lorem sed mi. Suspendisse dignissim dui ut pulvinar egestas. Pellentesque urna eros, gravida in maximus eget, euismod at libero. Praesent hendrerit lacus in odio sodales, at ultricies turpis molestie. Sed mattis risus vel egestas semper."
      };
    });


    let d3 = platformsData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Platforms",
        value: Math.random() * 100,
        angle: Math.random() * 90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu pretium ligula, sed pretium diam. Suspendisse commodo odio ac ligula mollis, sed condimentum ante finibus. Fusce quis sollicitudin augue. Vestibulum sed sem mauris. Curabitur ac tincidunt eros, vel maximus nunc. Fusce porta feugiat lacinia. Phasellus interdum, sem sed pharetra congue, dolor libero pretium est, eu tempor ipsum lorem sed mi. Suspendisse dignissim dui ut pulvinar egestas. Pellentesque urna eros, gravida in maximus eget, euismod at libero. Praesent hendrerit lacus in odio sodales, at ultricies turpis molestie. Sed mattis risus vel egestas semper."
      };
    });

    let d4 = languagesFrameworksData.map(x => {
      return {
        id: this.guid(),
        name: x,
        quadrant: "Languages and Frameworks",
        value: Math.random() * 100,
        angle: Math.random() * 90,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu pretium ligula, sed pretium diam. Suspendisse commodo odio ac ligula mollis, sed condimentum ante finibus. Fusce quis sollicitudin augue. Vestibulum sed sem mauris. Curabitur ac tincidunt eros, vel maximus nunc. Fusce porta feugiat lacinia. Phasellus interdum, sem sed pharetra congue, dolor libero pretium est, eu tempor ipsum lorem sed mi. Suspendisse dignissim dui ut pulvinar egestas. Pellentesque urna eros, gravida in maximus eget, euismod at libero. Praesent hendrerit lacus in odio sodales, at ultricies turpis molestie. Sed mattis risus vel egestas semper."
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
