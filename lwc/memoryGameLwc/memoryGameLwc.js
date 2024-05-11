import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import fontawesome from '@salesforce/resourceUrl/fontawesome';

export default class MemoryGameLwc extends LightningElement {
    isLibLoaded = false;
    cards = [
        {id:1, listClass: "card", type: "diamond", icon:'fa fa-diamond'},
        {id:2, listClass: "card", type: "plane", icon:'fa fa-paper-plane-o'},
        {id:3, listClass: "card", type: "anchor", icon:'fa fa-anchor'},
        {id:4, listClass: "card", type: "bolt", icon:'fa fa-bolt'},
        {id:5, listClass: "card", type: "cube", icon:'fa fa-cube'},
        {id:6, listClass: "card", type: "leaf", icon:'fa fa-leaf'},
        {id:7, listClass: "card", type: "bicycle", icon:'fa fa-bicycle'},
        {id:8, listClass: "card", type: "bomb", icon:'fa fa-bomb'},
        {id:9, listClass: "card", type: "diamond", icon:'fa fa-diamond'},
        {id:10, listClass: "card", type: "plane", icon:'fa fa-paper-plane-o'},
        {id:11, listClass: "card", type: "anchor", icon:'fa fa-anchor'},
        {id:12, listClass: "card", type: "bolt", icon:'fa fa-bolt'},
        {id:13, listClass: "card", type: "cube", icon:'fa fa-cube'},
        {id:14, listClass: "card", type: "leaf", icon:'fa fa-leaf'},
        {id:15, listClass: "card", type: "bicycle", icon:'fa fa-bicycle'},
        {id:16, listClass: "card",type: "bomb", icon:'fa fa-bomb'}
    ]


    //whenever we load 3rd party, we use rendered callback which gives assurance that the  html loaded so that we can apply 3rd party css 
    renderedCallback(){
        if(this.isLibLoaded){
            return
        }
        else{
            loadStyle(this, fontawesome + '/fontawesome/css/font-awesome.min.css')
            .then(() => {
                console.log('loaded successfully')
            }).catch(error => {
            console.error(error)
            })
        this.isLibLoaded=true
        }
    }

    displayCard(event){
        let currentCard = event.taget
        currentCard.classList.add("open", "show", "disabled")
    }
}