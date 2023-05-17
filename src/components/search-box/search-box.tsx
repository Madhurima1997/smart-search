import { Component, Host, State, h } from "@stencil/core";
import { Responsee } from "../../utils/Response.interface";

@Component({
    tag: 'ti-hack-search-box',
    styleUrl: 'search-box.scss',
    shadow: false
})
export class SearchBox{

    private debounceIntervalId: any = null;
    private titleVal:string;

    @State() searchResults: Responsee[] = {} as Responsee[];

    /**
     * On Input og a key in textbox, this event fires to provide
     * suggestions for products. Currently shows results of dummy response
     * in list format
     * @param _ev event
     */
    private _callApi(_ev: InputEvent) {
        // this.searchResults = {} as Responsee[];
        const x = document.getElementById('searchInput') as HTMLInputElement;
        if(x.value !==this.titleVal) {
            this.searchResults = [];
        }
        this.titleVal = x.value;
        const interval = setInterval(async () => {
            clearInterval(interval);
            if(interval === this.debounceIntervalId) {
                this.debounceIntervalId=null;
                this.searchResults=await this._fetchResult(this.titleVal);
            }
        }, 750);
        this.debounceIntervalId = interval;
    }

    /**
     * Using dummy university api http://universities.hipolabs.com/search?country=India
     * to demonstrate the search component api call.
     * To be substituted by NLP product suggestor API
     * @param key Searh key
     */
    private _fetchResult(key: string): Promise<Responsee[]> {
        return fetch(`http://universities.hipolabs.com/search?country=${key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }            
            return response.json();
        })
    
    }

    render() {
        return(
            <Host>
                <div class="search-container">
                    <input 
                        id="searchInput"
                        type="text" 
                        placeholder="Search" 
                        onInput={ev => this._callApi(ev)}
                    />
                    <button type="submit"><i class="fa fa-search"></i></button>
                </div>
                <div class="results" id="result">
                    <ul>
                        
                            {Array.from(this.searchResults).map((item:any={})=>
                            <li>
                              {item.id} {item.name}
                             </li>
                             )}
                            </ul>
                        
                    
                </div>
            </Host>
        );
    }
}