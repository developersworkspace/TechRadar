export class DataService {

    constructor() {

    }

    list(): Promise<any[]> {
        return new Promise((resolve: Function, reject: Function) => {

        });
    }

    create(title: string, description: string) {
        return new Promise((resolve: Function, reject: Function) => {

        });
    }

    find(id: string) {
        return new Promise((resolve: Function, reject: Function) => {

        });
    }

    private getInstanceOfItem(title: string, description: string, quadrant: string) {
        return {
            id: this.generateId(),
            name: title,
            quadrant: quadrant,
            value: 0,
            angle: this.generateAngle(),
            description: description
        };
    }

    private generateAngle() {
        return Math.random() * 90
    }

    private generateId(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}