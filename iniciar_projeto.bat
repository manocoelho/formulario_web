@echo off
color 0B
echo ==================================================
echo   INICIANDO OS SERVIDORES DO FCJA DOCS
echo ==================================================
echo.

echo Iniciando o Backend na porta 5000...
start "Backend - FCJA Docs" cmd /k "cd backend && node src/server.js"

echo Iniciando o Frontend no Vite...
start "Frontend - FCJA Docs" cmd /k "cd frontend && npm run dev"

echo.
echo Os servidores foram abertos em novas janelas.
echo O frontend estara disponivel em: http://localhost:5173
echo.
pause