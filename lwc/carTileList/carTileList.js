import { LightningElement,wire } from 'lwc';

import getCars from '@salesforce/apex/carController.getCars'

import {publish,subscribe, unsubscribe, MessageContext} from 'lightning/messageService'
//LMS and a message channel
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/carsFiltered__c'
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarsSelected__c'

export default class CarTileList extends LightningElement {
    cars=[]
    error
    filters = {};
    carFilterSubscription;

    @wire(getCars, {filters: '$filters'}) 
    carsHandler({data,error}){
        if(data){
            console.log("data => ",data)
            this.cars=data
        }
        if(error){
            console.error(error)
        }
    }

    /*Load context for LMS*/
    @wire(MessageContext)
    messageContext

    connectedCallback() {
        this.subscribeHandler()
    }

    subscribeHandler(){
        this.carFilterSubscription =  subscribe(this.messageContext, CARS_FILTERED_MESSAGE, (message)=> this.handleFilterChanges(message))
    }

    handleFilterChanges(message){
        console.log('message.filters', message.filters)
        this.filters={...message.filters}
    }

    handleCarSelected(event){
        console.log("selected car Id",event.detail)
        publish(this.messageContext, CAR_SELECTED_MESSAGE, {
            carId: event.detail
        })
    }
    disconnectedCallback() {
        unsubscribe(this.carFilterSubscription)
        this.carFilterSubscription=null
    }
}