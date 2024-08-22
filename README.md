## Setup Procedure

- If there no .env file in `app` folder, create .env file at app folder with this: `VITE_API_GENERATIVE_LANGUAGE_CLIENT=paste_your_api_key`
- Get API key from: [api-key](https://aistudio.google.com/app/apikey)
- `npm install @google/generative-ai`

## Getting Started
* Terminal server
  ```sh
  cd server
  ```
  ```sh
  npm i
  ```
  ```sh
  node --env-file=config.env server
  ```

* Terminal app
  ```sh
  cd app
  ```
  ```sh
  npm i
  ```
  ```sh
  npm run dev
  ```

## Pages navigation

    .
    ├── Index Home                   # `/`
    ├── Main Home                    # `/main-home`
    ├── Problems page                # `/problems`
    ├── Courses page                 # `/courses`
    ├── Playground                   # `/playground`
    └── Contact page                 # `/contact`
## How to run
Create file config.env in folder server 
<br />
config.env file required:
`ATLAS_URI`,`PORT`, `GEMINI_API_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRESIN`, `REFRESH_TOKEN_EXPIRESIN`, `JWT_ACCESS_TOKEN_SECRET`, `JWT_REFRESH_TOKEN_SECRET`, `OTP_SECRET`, `VITE_API_GENERATIVE_LANGUAGE_CLIENT`, `EMAIL_USER`, `EMAIL_PASSWORD`


Built by [[LeTranTrongNghia](https://github.com/LeTranTrongNghia)] & [[ngcuyen](https://github.com/ngcuyen)]
