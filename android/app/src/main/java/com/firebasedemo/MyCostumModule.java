package com.firebasedemo;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyCostumModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactApplicationContext;
    MyCostumModule(ReactApplicationContext reactContext){
        super(reactContext);
        reactApplicationContext=reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "XYZ";
    }

    @ReactMethod
    public void goToNextScreen(){
        Intent intent=new Intent(reactApplicationContext,DemoActivity.class);
        getCurrentActivity().startActivity(intent);
    }
}
