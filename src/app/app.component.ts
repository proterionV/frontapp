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
    templateUrl: './app.component.html',
    styleUrls: ['./style.css']
})

export class AppComponent implements OnInit { 

    id: number;
    name: string;
    url: string = 'https://localhost:44338/resource/';
    items: Item[] = [];

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.getResources();  
    }

    getResources() {
        try{
            this.http.get(this.url,)
                .subscribe((data: Item[]) => this.items = data);   
        }
        catch (exception){
            console.log(`${exception}`);
        } 
    }

    addItem(id: number, name: string): void {

        if (id == null || name == "" || name == null)  return;

        var same = this.items.filter(obj => obj.id == id);

        if (same.length > 0) return;

        let item: Item = new Item(id, name);

        this.http.post(this.url, item, {observe: 'response'}).subscribe(response => console.log(`${response.status}`));

        this.items.push(new Item(id, name));
    }

    saveItem(id: number): void {
    
    let value: string = null;
    let sendItem: Item = null;

    const table: HTMLTableElement = document.querySelector('#tbl');
    const rows = table.tBodies[0].rows;

    Array.from(rows).forEach((row) => { 
       const tds =  Array.from(row.cells).map((td) => td.textContent) 
       
       if (tds[0] == id.toString()) 
         value = tds[1];});

        if (value == null) { this.getResources(); return; }

        this.items.forEach((item) => {
            if (item.id == id)
            {
                item.name = value;
                sendItem = item;
            }
        });

        if (sendItem == null) return;

        this.http.put(this.url, sendItem, {observe: 'response'}).subscribe(response => console.log(`${response.status}`));
    }

    removeItem(resource: Item){

        this.http.delete(this.url + resource.id, {observe: 'response'}).subscribe(response => console.log(`${response.status}`));

        this.items.forEach( (item, index) => {
          if(item === resource) this.items.splice(index,1);
        });
    }   
}