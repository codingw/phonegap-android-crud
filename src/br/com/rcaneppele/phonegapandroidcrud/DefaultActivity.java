package br.com.rcaneppele.phonegapandroidcrud;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class DefaultActivity extends DroidGap {

	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
	
}