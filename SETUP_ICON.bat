@echo off
echo ============================================
echo  ELLIE CHATBOT - APP ICON SETUP
echo ============================================
echo.
echo This script will help you set up your app icon.
echo.
echo STEP 1: Get your icon ready
echo ----------------------------
echo 1. Save your Ellie logo image to your Desktop
echo 2. Go to: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
echo 3. Upload your logo
echo 4. Click Download
echo 5. Extract the zip file
echo.
pause
echo.
echo STEP 2: Copy the icon files
echo ---------------------------
echo 1. Open the extracted folder
echo 2. You'll see folders: mipmap-mdpi, mipmap-hdpi, etc.
echo 3. Copy ALL these folders
echo 4. Paste them into:
echo    %~dp0app\src\main\res\
echo 5. Replace files when asked
echo.
pause
echo.
echo STEP 3: Build the app
echo --------------------
echo 1. Open Android Studio
echo 2. Click: Build -^> Clean Project
echo 3. Click: Build -^> Rebuild Project
echo 4. Run the app
echo.
echo ============================================
echo  DONE! Your Ellie logo is now the app icon!
echo ============================================
echo.
pause