package io.lifetopiaworld.community;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public final class MobileWalletCallbackActivity extends Activity {
    private static final Set<String> ALLOWED_PARAMETERS = Collections.unmodifiableSet(new HashSet<>(Arrays.asList(
        "state", "provider", "stage", "errorCode", "errorMessage", "data", "nonce",
        "phantom_encryption_public_key", "solflare_encryption_public_key"
    )));

    @Override protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Uri incoming = getIntent() == null ? null : getIntent().getData();
        if (incoming == null || !"lifetopia-community".equals(incoming.getScheme()) || !"wallet-auth".equals(incoming.getHost())) { finish(); return; }

        Uri.Builder callback = Uri.parse("https://lifetopiaworld.io/auth/wallet-mobile/callback").buildUpon();
        for (String name : ALLOWED_PARAMETERS) {
            String value = incoming.getQueryParameter(name);
            if (value != null) callback.appendQueryParameter(name, value);
        }

        Uri callbackUri = callback.build();
        Intent internal = new Intent(Intent.ACTION_VIEW, callbackUri).setPackage(getPackageName()).addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        try { startActivity(internal); }
        catch (ActivityNotFoundException unavailable) { startActivity(new Intent(Intent.ACTION_VIEW, callbackUri)); }
        finish();
    }
}
