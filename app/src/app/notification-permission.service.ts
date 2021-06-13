import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';


import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router'
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationPermissionService {
  token:any
  uuid:any
  user_details:any
  constructor(private angularFireMessaging: AngularFireMessaging, private notification : NotificationService, private router : Router) { 
    this.uuid = 'new_user'
    this.notification.getSingle('users', this.uuid).then(res => {
      this.user_details = res
      this.requestPermission()
    })
    // this.receiveMessage()
    
    // this.receiveMessage()
  }

  requestPermission() {
    if(!(Capacitor.getPlatform() == 'web')){
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          console.log('permission')
          PushNotifications.register().then(res=>{
            console.log("ergister")
          }).catch(err=>{
            console.log("register ",err)
          })
        } else {
          // Show some error
          console.log("error")
        }
      }).catch(err=>{
        console.log("error",err)
      })
      PushNotifications.addListener('registration', (token: Token) => {
          console.log('Push registration success, token: ' + token);
          this.token = token.value
          // this.notification.add('publicToken', {
          //   token:this.token
          // }, this.token)
          this.updateToken()
        },
      ).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log("error",err)
      })
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          console.log('Push received: ' + JSON.stringify(notification));
        },
      );
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          //alert('Push action performed: ' + JSON.stringify(notification.notification.data));
          setTimeout(() => {
            if (notification.notification.data.route) {
              this.router.navigateByUrl('/notifications')
            }
          }, 500);
        },
      );
    }
    else{
      this.angularFireMessaging.requestToken.subscribe(token => {
        this.token = token
        if(this.token){
          // this.notification.add('publicToken', {
          //   token:this.token
          // }, this.token)
          this.updateToken()
        }
        
      },(err) => {
        console.error('Unable to get permission to notify.', err);
      })
    }
    
    
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(payload => {
      console.log("new message received. ", payload);
      //this.currentMessage.next(payload);
    })
  }
    
  updateToken(){
    let tokenObj={platform:Capacitor.getPlatform(), token:this.token}
    if(!this.user_details.pushTokens){
      this.user_details.pushTokens = []
      this.user_details.pushTokens.push(tokenObj)
      this.notification.update('users', this.uuid, this.user_details)
    }
    else if(!(this.user_details.pushTokens?.find((object:any) => {return object.token == this.token}))){
      this.user_details.pushTokens.push(tokenObj)
      this.notification.update('users', this.uuid, this.user_details)
    }
  }
}
