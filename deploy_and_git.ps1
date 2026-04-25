# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Book Review App (Spring Boot + React)"

# Instructions for the user
Write-Host "=======================================================" -ForegroundColor Green
Write-Host "Git repository initialized and files committed locally!" -ForegroundColor Green
Write-Host "To push to a public GitHub repository, follow these steps:" -ForegroundColor Cyan
Write-Host "1. Create an empty public repository on GitHub (https://github.com/new)"
Write-Host "2. Run the following commands in this terminal (replace <YOUR_REPO_URL>):"
Write-Host ""
Write-Host "   git branch -M main"
Write-Host "   git remote add origin <YOUR_REPO_URL>"
Write-Host "   git push -u origin main"
Write-Host "=======================================================" -ForegroundColor Green

Write-Host ""
Write-Host "=======================================================" -ForegroundColor Yellow
Write-Host "Deployment Instructions:" -ForegroundColor Yellow
Write-Host "1. Render (Backend + Database):"
Write-Host "   - Connect your GitHub repo to Render (https://dashboard.render.com)"
Write-Host "   - Click 'New' -> 'Blueprint' and select your repo."
Write-Host "   - Render will automatically deploy the PostgreSQL DB and Spring Boot app using render.yaml"
Write-Host ""
Write-Host "2. Vercel (Frontend):"
Write-Host "   - Log in to Vercel (https://vercel.com)"
Write-Host "   - Click 'Add New' -> 'Project' and import your GitHub repo."
Write-Host "   - Set 'Framework Preset' to Vite."
Write-Host "   - Set 'Root Directory' to 'frontend'."
Write-Host "   - Add an Environment Variable: VITE_API_URL = <Your_Render_Backend_URL>"
Write-Host "   - Click Deploy!"
Write-Host "=======================================================" -ForegroundColor Yellow
