# CLAUDE/Anthropic Setup for This Project

Ye file sirf documentation ke liye hai. Isko banane se khud se account active nahin hota, lekin aapko step-by-step guide mil jaega jisse aap naya token sahi tareeke se set kar saken.

## 1) New Account & API Key
1. https://platform.claude.com/settings/billing par login karo.
2. Naya account ya existing account open karo.
3. API Keys section se "Create API key" ya "Generate token" pe click karo.
4. TOKEN copy karo (format: `sk-ant-...`).

## 2) Project me `.env.local` set karo
1. `d:\Next.js project\Gym Equipment\.env.local` khol.
2. yeh line add/update karo:
   ```env
   ANTHROPIC_API_KEY=sk-ant-YOUR-NEW-KEY
   ```
3. Save karo.

## 3) Dev server restart karo
Terminal me:
```sh
npm run dev
```

## 4) App me verify karo
Code jahan API call hoti ho wahan:
```ts
const key = process.env.ANTHROPIC_API_KEY;
```
Aur request bhejo. Agar `Credit balance too low` hata hua hai, to naya account sahi se connected hai.

## 5) Troubleshooting
- Agar error abhi bhi aaye to:
  - billing page se credit check karo
  - `.env.local` me values sahi hain ya nai check karo
  - server restart dubara karo

## 6) Git ignore
Make sure `.env.local` git commit na ho (project root me `.gitignore` me `.env*` entries honi chahiye).