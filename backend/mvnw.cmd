@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper Script for Windows
@REM ----------------------------------------------------------------------------
@IF "%DEBUG%"=="" @ECHO OFF
@SETLOCAL EnableExtensions EnableDelayedExpansion

WHERE mvn >NUL 2>&1
IF %ERRORLEVEL% EQU 0 (
  mvn %*
  EXIT /B %ERRORLEVEL%
)

SET "MAVEN_VERSION=3.9.8"
SET "MAVEN_DIR=%USERPROFILE%\.m2\wrapper\dists\apache-maven-%MAVEN_VERSION%"
SET "MAVEN_CMD=%MAVEN_DIR%\apache-maven-%MAVEN_VERSION%\bin\mvn.cmd"

IF NOT EXIST "%MAVEN_CMD%" (
  IF EXIST "%MAVEN_DIR%\bin\mvn.cmd" (
    SET "MAVEN_CMD=%MAVEN_DIR%\bin\mvn.cmd"
  )
)

IF EXIST "%MAVEN_CMD%" (
  CALL "%MAVEN_CMD%" %*
  EXIT /B %ERRORLEVEL%
)

ECHO Downloading Apache Maven %MAVEN_VERSION%...
SET "ZIP_PATH=%TEMP%\apache-maven-%MAVEN_VERSION%-bin.zip"
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/%MAVEN_VERSION%/apache-maven-%MAVEN_VERSION%-bin.zip', '%ZIP_PATH%'); Expand-Archive -Path '%ZIP_PATH%' -DestinationPath '%MAVEN_DIR%' -Force; Remove-Item '%ZIP_PATH%' -Force}"

IF NOT EXIST "%MAVEN_CMD%" (
  IF EXIST "%MAVEN_DIR%\bin\mvn.cmd" (
    SET "MAVEN_CMD=%MAVEN_DIR%\bin\mvn.cmd"
  )
)

IF EXIST "%MAVEN_CMD%" (
  CALL "%MAVEN_CMD%" %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO Failed to set up Maven. Please install Maven or check internet connection.
  EXIT /B 1
)
