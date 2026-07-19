plugins { id("com.android.application") }

android {
    namespace = "io.lifetopiaworld.community"
    compileSdk = 36

    defaultConfig {
        applicationId = "io.lifetopiaworld.community"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        debug { applicationIdSuffix = ".debug"; versionNameSuffix = "-debug" }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    buildFeatures { buildConfig = true }
    lint { abortOnError = true; checkReleaseBuilds = true }
}

dependencies {
    implementation("com.google.androidbrowserhelper:androidbrowserhelper:2.7.2")
}
