import { Component, ViewChild, Renderer, ElementRef } from "@angular/core";
import { Http, Headers } from "@angular/http";

@Component({
    selector: 'tw-api-test',
    templateUrl: './app/components/twitter-api/twitter-rest-api.component.html',
    styleUrls: ['./assets/css/tweet.component.css']
})
export class TwitterRestApiComponent {
    @ViewChild('searchInput') searchInput: ElementRef;
    isAuthorized: boolean = false;
    title = 'Works!';
    search_query = '';
    tweetsdata = [];

    constructor(private http: Http, private renderer: Renderer) {
        // this.makeCall();
    }

    makeCall() {
        console.log('Authorizing...');
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        
        this.http.post('http://localhost:4200/authorize', {
            headers: headers
        }).subscribe(res => {
            console.log(res);
            if (res.json().success) {
                this.isAuthorized = true;
            }
        });
    }

    searchCall() {
        console.log('Searching...');

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        
        this.http.post('http://localhost:4200/search', `query=${this.search_query}`, {
            headers: headers
        }).subscribe(res => {
            if (res.json().success) {
                this.tweetsdata = res.json().data.statuses;
                console.log(res.json().data);
                this.renderer.invokeElementMethod(this.searchInput.nativeElement, 'blur');
            }
        }); 
    }

    userCall() {
        console.log('Timelining...');

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        
        this.http.post('http://localhost:4200/user', 'screenname=vv4t', {
            headers: headers
        }).subscribe(res => {
            this.tweetsdata = res.json().data;
            console.log(res.json().data);
        }); 
    }

}
