package com.example.talkie01;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.util.Log;

import com.google.android.gcm.GCMRegistrar;

public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		String regid = registerGcm();
		
		super.loadUrl("file:///android_asset/www/auth/NewMainLogin.html");
		
	}

	public String registerGcm() {
	  
		GCMRegistrar.checkDevice(this);
		GCMRegistrar.checkManifest(this);

		final String regId = GCMRegistrar.getRegistrationId(this);
		Log.d("MainActivity", "regId:" + regId);

		if (regId.equals("")) {
		  GCMRegistrar.register(this, "1073279447138");
		} else {
			Log.e("id", regId);
		}
		
		return regId;

	}

}