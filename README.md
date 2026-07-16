# URL Checker

Асинхронный сервис проверки URL.

Fullstack приложение для создания задач проверки списка URL, фоновой обработки запросов, отслеживания прогресса и управления состоянием выполнения.

## Demo

https://github.com/user-attachments/assets/c5d0347b-b910-454c-88b0-c565011189ab
---

# Overview

Приложение состоит из:

- Backend REST API на NestJS
- Frontend SPA на React
- Docker окружения для запуска проекта

Сервис принимает список URL, создает асинхронную задачу, выполняет проверки в фоне с ограничением конкурентности и предоставляет интерфейс для отслеживания прогресса.

# Features

## Backend

Реализовано:

- Создание асинхронных задач проверки URL
- Генерация уникального `jobId`
- Хранение состояния задач в памяти (in-memory)
- Фоновая обработка URL
- HTTP HEAD проверки
- Ограничение до 5 одновременных запросов внутри одной задачи
- Возможность выполнять несколько задач параллельно
- Отмена выполняющейся задачи
- Отслеживание статусов каждого URL
- Искусственная задержка перед сохранением результата (0-10 секунд)
- Swagger документация API

Поддерживаемые статусы:

Job:
pending
in_progress
completed
cancelled
failed

URL:
pending
in_progress
success
error
cancelled

---

# Frontend

Реализовано:

- Создание новой задачи через textarea
- Каждый URL вводится с новой строки
- Автоматический выбор созданной задачи
- Список последних задач
- Просмотр детальной информации по задаче
- Отображение прогресса выполнения
- Статусы каждого URL
- HTTP-коды ответов
- Ошибки выполнения
- Время выполнения запроса
- Polling состояния активной задачи
- Корректная остановка polling при смене задачи
- Отмена задачи
- Responsive UI

---

# Tech Stack

## Backend

- Node.js
- TypeScript
- NestJS
- UUID
- Fetch API
- Swagger

## Frontend

- React 19
- TypeScript
- Zustand
- Axios
- CSS Modules
- Vite
- Sonner notifications

---

# Architecture

## Backend structure

```text
server/
│
├── src/
│   ├── jobs/
│   │   ├── dto/
│   │   │   ├── create-job.dto.ts
│   │   │   └── ...
│   │   │
│   │   ├── interfaces/
│   │   │   └── job.interface.ts
│   │   │
│   │   ├── types/
│   │   │   └── job.types.ts
│   │   │
│   │   ├── url-processor/
│   │   │   ├── url-processor.service.ts
│   │   │   └── ...
│   │   │
│   │   ├── jobs.controller.ts
│   │   ├── jobs.service.ts
│   │   └── jobs.module.ts
│   │
│   └── main.ts
```

Backend разделен на слои:

- Controllers отвечают только за HTTP слой
- Services содержат бизнес-логику
- DTO + Swagger schemas описывают контракт API

---

## Frontend structure

```text
client/
│
├── src/
│
├── api/
│ ├── client.ts
│ └── jobs.api.ts
│
├── models/
│
├── store/
│ └── jobs.store.ts
│
├── hooks/
│ ├── useJobs.ts
│ └── useJobPolling.ts
│
├── services/
│
└── components/
├── Dashboard/
├── JobForm/
├── JobList/
├── JobDetails/
└── UI/
```

Frontend разделен на:

- API слой
- Zustand store
- Custom hooks
- UI компоненты
- Сервисы

UI не зависит напрямую от HTTP реализации.

---

# API

## Create job

POST /api/jobs

Request:

```json
{
  "urls": [
    "https://example.com",
    "https://google.com"
  ]
}

Response:
{
  "jobId": "uuid"
}
```

Get jobs
GET /api/jobs

Возвращает список задач:

id
createdAt
status
количество URL
success/error статистику

Get job details
GET /api/jobs/:id

Возвращает:

статус задачи
прогресс
список URL
HTTP статус
ошибки
длительность обработки

Cancel job
DELETE /api/jobs/:id

Отменяет задачу и прекращает обработку необработанных URL.

Swagger

API документирован через Swagger.

После запуска:

http://localhost:3000/api

Swagger содержит:

endpoints
request schemas
response schemas
DTO модели
Running with Docker
docker compose up --build

Frontend:

http://localhost:5173

Backend:

http://localhost:3000

Swagger:

http://localhost:3000/api
Development
Frontend

Install:

npm install

Run:

npm run dev

Build:

npm run build
Backend

Install:

npm install

Development:

npm run start:dev

Production build:

npm run build
npm run start:prod
Notes
Database не используется согласно условиям задания
Состояние хранится in-memory
Архитектура подготовлена с разделением API, бизнес-логики и UI слоев
TypeScript используется на frontend и backend

---
