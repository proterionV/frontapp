import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
     
class Item{
    id: number;
    name: string;
     
    constructor(id: number, name: string) {
  
        this.id = id;
        this.name = name;
    }
}
 
@Component({
    selector: 'frontapp',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit { 

    id: number;
    name: string;

    items: Item[] = [];

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.getResources();  
    }

    getResources() {
        this.http.get('https://localhost:44338/resource')
            .subscribe((data: Item[]) => this.items = data);
    }

    addItem(id: number, name: string): void {

        if (id == null || name == "" || name == null)  return;

        var same = this.items.filter(obj => obj.id == id);

        if (same.length > 0) return;

        let item: Item = new Item(id, name);

        this.http.post('https://localhost:44338/resource', item).subscribe();

        this.items.push(new Item(id, name));
    }

    saveItem(item: Item): void {

        this.http.put('https://localhost:44338/resource/', item).subscribe();
    }

    removeItem(resource: Item){

        this.http.delete('https://localhost:44338/resource/' + resource.id).subscribe();

        this.items.forEach( (item, index) => {
          if(item === resource) this.items.splice(index,1);
        });
    }   
}