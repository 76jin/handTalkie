/*
 * Copyright (C) 2013 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example.talkie01;

import java.util.Date;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.android.gcm.GCMBaseIntentService;
public class GcmIntentService extends GCMBaseIntentService {

  private static void generateNotification(Context context, String message) {

    int icon = R.drawable.ic_launcher;
    long when = System.currentTimeMillis();
    
    Date now = new Date();
    long uniqueId = now.getTime();//use date to generate an unique id to differentiate the notifications.


    NotificationManager notificationManager = (NotificationManager) context
        .getSystemService(Context.NOTIFICATION_SERVICE);

    Notification notification = new Notification(icon, message, when);

    String title = context.getString(R.string.app_name);

    Intent notificationIntent = new Intent(context, MainActivity.class);
    
    notificationIntent.setAction("com.example.talkie01" + uniqueId);

    notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP 
        | Intent.FLAG_ACTIVITY_SINGLE_TOP);
    PendingIntent intent = PendingIntent.getActivity(context, 0,
        notificationIntent, PendingIntent.FLAG_ONE_SHOT);



    notification.setLatestEventInfo(context, title, message, intent);

    notification.flags |= Notification.FLAG_AUTO_CANCEL;

    //Play default notification sound
    notification.defaults |= Notification.DEFAULT_SOUND;

    //Vibrate if vibrate is enabled
    notification.defaults |= Notification.DEFAULT_VIBRATE;

    //notificationManager.notify(0, notification);
    notificationManager.notify((int) uniqueId, notification); 

  }

  @Override
  protected void onError(Context arg0, String arg1) {

  }

  @Override
  protected void onMessage(Context context, Intent intent) {

    String msg = intent.getStringExtra("msg");
    Log.e("getmessage", "getmessage:" + msg);
    generateNotification(context,msg);

  }



  @Override

  protected void onRegistered(Context context, String reg_id) {
    Log.e("키를 등록합니다.(GCM INTENTSERVICE)", reg_id);
  }



  @Override

  protected void onUnregistered(Context arg0, String arg1) {
    Log.e("키를 제거합니다.(GCM INTENTSERVICE)","제거되었습니다.");
  }

}