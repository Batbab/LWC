/*import { LightningElement,api,wire } from 'lwc';
import getSimilarCars from '@salesforce/apex/carController.getSimilarCars';
import {getRecord} from 'lightning/uiRecordApi';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';

import {NavigationMixin} from 'lightning/navigation'

export default class SimilarCars extends NavigationMixin(LightningElement) {
    similarCars

    @api recordId
    @api objectApiName

    @wire(getRecord, {recordId: '$recordId', fields:[MAKE_FIELD]})
    car

    //console.log("car makeType =>",this.car.data.fields.Make__c.value);

    fetchSimilarCars(){
        console.log(this.car.data.fields.Make__c.value);
        getSimilarCars({
            carId: this.recordId,
            makeType: this.car.data.fields.Make__c.value
        }).then(result=>{
            this.similarCars = result
            console.log("similar Cars => ", this.similarCars)
        }).catch(error => {
            console.error("Error in fetching similar cars => ", error)
        })
    }

    handleViewDetailsClick(event){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
               recordId:event.target.dataset.id,
               objectApiName: this.objectApiName,
               actionName:'view'
            }
        })
    }
}*/

import { LightningElement, api, wire } from 'lwc';
import getSimilarCars from '@salesforce/apex/carController.getSimilarCars'
import {getRecord} from 'lightning/uiRecordApi'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'

import {NavigationMixin} from 'lightning/navigation'
export default class SimilarCars extends NavigationMixin(LightningElement) {
    similarCar
  
    @api recordId;
    @api objectApiName

    @wire(getRecord,{recordId: '$recordId', fields:[MAKE_FIELD]})
    car


    fetchSimilarCars(){
        getSimilarCars({
            carId:this.recordId,
            makeType :this.car.data.fields.Make__c.value
        }).then(result=>{
            this.similarCar = result
            console.log(this.similarCar)
        }).catch(error=>{
            console.error(error)
        })
    }
    handleViewDetailsClick(event){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.id,
                objectApiName:this.objectApiName,
                actionName:'view'
            }
        })
    }
}