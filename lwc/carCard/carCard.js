import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

//Car__c schema
import CAR_OBJECT from '@salesforce/schema/Car__c'
import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_seats__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'
//getFieldValue function is used to extract field values
import {getFieldValue} from 'lightning/uiRecordApi'

//lightning message service
import {subscribe, MessageContext, unsubscribe} from 'lightning/messageService'
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarsSelected__c'

export default class CarCard extends NavigationMixin(LightningElement) {

    ///load context for LMS
    @wire(MessageContext) messageContext

    //exposing fields to make them available in the template
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD

    //Id of car__c
    recordId
    //car fields displayed with specific format
    carName
    carPictureUrl

    //subscription reference for carSelected
    carSelectionSubscription

    handleRecordLoaded(event){
        const {records} = event.detail
        console.log("car card event.detail => ", event.detail)
        const recordData = records[this.recordId]
        console.log(" records[this.recordId] =>", recordData)

        this.carName = getFieldValue(recordData, NAME_FIELD)
        console.log("car card carName", this.carName)
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
        console.log("car card carPictureUrl", this.carPictureUrl)
    }

    connectedCallback() {
        this.subscribeHandler()
    }
    subscribeHandler(){
        this.carSelectionSubscription = subscribe(this.messageContext, CAR_SELECTED_MESSAGE, (message) => this.handleCarSelected(message))
    }
    handleCarSelected(message){
        this.recordId=message.carId
    }
    disconnectedCallback() {
        unsubscribe(this.carSelectionSubscription)
        this.carSelectionSubscription=null
    }
    /**Navigate to recordPage */
    handleNavigateToRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes: {
                recordId:this.recordId,
                objectApiName: CAR_OBJECT.objectApiName,
                actionName:'view'
            }
        })
    }
}