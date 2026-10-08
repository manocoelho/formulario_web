@echo off
color 0A
echo ========================================================
echo   INSTALANDO DEPENDENCIAS DO SISTEMA FCJA DOCS
echo ========================================================
echo.
echo O instalador lera os arquivos package.json e baixara:
echo - Backend: Express, PostgreSQL (pg), Cors, Dotenv
echo - Frontend: React Router, Recharts, XLSX, Lucide Icons
echo.

echo [1/2] Acessando o Backend e sincronizando pacotes...
cd backend
call npm install
cd ..
echo - Backend atualizado com sucesso!
echo.

echo [2/2] Acessando o Frontend e sincronizando pacotes...
cd frontend
call npm install
cd ..
echo - Frontend atualizado com sucesso!
echo.

echo ========================================================
echo   TODAS AS BIBLIOTECAS FORAM INSTALADAS E ATUALIZADAS!
echo ========================================================
pause