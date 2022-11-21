package com.firebasedemo;

import android.content.Intent;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModule extends ReactContextBaseJavaModule {
    private static  ReactApplicationContext reactContext;
    CustomModule(ReactApplicationContext context){
        super(context);
        reactContext=context;
    }
    @NonNull
    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void showMessage(){
        Toast.makeText(reactContext, "Hello Good Morning", Toast.LENGTH_SHORT).show();
        Intent intent=new Intent(reactContext,DemoActivity.class);
        getCurrentActivity().startActivity(intent);
    }
}
