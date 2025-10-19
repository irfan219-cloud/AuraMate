@echo off
echo.
echo ========================================
echo   🌸 AuraMate Setup Verification
echo ========================================
echo.

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js found
echo.

echo Checking npm...
npm --version
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
)
echo ✅ npm found
echo.

echo Checking project files...
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found!
    pause
    exit /b 1
)

if exist "app\page.tsx" (
    echo ✅ Landing page found
) else (
    echo ❌ Landing page not found!
)

if exist "app\chat\page.tsx" (
    echo ✅ Chat page found
) else (
    echo ❌ Chat page not found!
)

if exist "app\journal\page.tsx" (
    echo ✅ Journal page found
) else (
    echo ❌ Journal page not found!
)

if exist "lib\voiceService.ts" (
    echo ✅ Voice service found
) else (
    echo ❌ Voice service not found!
)

if exist "lib\aiService.ts" (
    echo ✅ AI service found
) else (
    echo ❌ AI service not found!
)

if exist "components\VoiceVisualizer.tsx" (
    echo ✅ Voice visualizer found
) else (
    echo ❌ Voice visualizer not found!
)

if exist "components\RecommendationCard.tsx" (
    echo ✅ Recommendation card found
) else (
    echo ❌ Recommendation card not found!
)

if exist "components\MoodInsights.tsx" (
    echo ✅ Mood insights found
) else (
    echo ❌ Mood insights not found!
)

echo.
echo ========================================
echo   ✅ Setup Verification Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo For voice features, use Chrome or Edge browser.
echo.
pause
