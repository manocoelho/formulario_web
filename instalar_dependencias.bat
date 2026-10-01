@echo off
color 0A
echo ==================================================
echo   INSTALANDO DEPENDENCIAS DO PROJETO FCJA DOCS
echo ==================================================
echo.

echo [1/2] Acessando o Backend e instalando pacotes...
cd backend
call npm install
cd ..
echo Backend atualizado!
echo.

echo [2/2] Acessando o Frontend e instalando pacotes...
cd frontend
call npm install
cd ..
echo Frontend atualizado!
echo.

echo ==================================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ==================================================
pause