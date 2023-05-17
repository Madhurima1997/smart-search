import { Component, Host, h } from "@stencil/core";

@Component({
    tag: 'ti-hack-search-box',
    styleUrl: 'search-box.scss',
    shadow: true
})
export class SearchBox{
    componentWillLoad() {
        console.log('Will load');
    }

    render() {
        return(
            <Host>
                <h1>Hi</h1>
            </Host>
        );
    }
}