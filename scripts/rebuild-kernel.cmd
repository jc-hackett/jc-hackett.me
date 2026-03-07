@echo off
setlocal

set "ROOT=%~dp0.."
set "BASH=C:\Program Files\Git\bin\bash.exe"

start "Erasmus Rebuild" /wait "%BASH%" -lc "cd \"%ROOT%\" && bash \"ERASMUS/Erasmus_REBUILD.sh\""

for /f "delims=" %%f in ('dir /b /o-d "%ROOT%\ERASMUS\_kernels\kernel-*.md"') do (
  start "" code --new-window "%ROOT%\ERASMUS\_kernels\%%f"
  goto :done
)

:done
endlocal