# online-shop

## Стек

- **Next.js 16** (App Router)
- **TypeScript**
- **TanStack React Query**
- **Tailwind CSS**
- **Vitest + React Testing Library**
- **ESLint + Prettier**

---


## Требования

- **Node.js**: 18+ (рекомендуется 20+)
- **npm**: 9+

---

## Установка

```bash
npm install

```

## Запуск проекта (dev)

```bash
npm run dev

```

## Перегенерация мок-данных
lib/mock/products.data.json

```bash
npm run mock:generate

```

## Тесты

```bash
npm run test:run

```

## API

В проекте используется мок-API, реализованное через **Next.js Route Handlers** (`app/api`).
API имитирует работу реального бэкенда и используется для разработки и тестирования UI.

### GET `/api/products`

Возвращает список товаров для каталога.

**Response 200**

```json
[
  {
    "id": "string",
    "title": "string",
    "slug": "string",
    "sku": "string",
    "preview": {
      "url": "string",
      "alt": "string"
    },
    "price": {
      "amount": 0,
      "currency": "KGS"
    },
    "rating": 0,
    "category": "string",
    "stockTotal": "string",
    "deliveryNearest?": "string",
    "tags": ["string"],
    "createdAt": "2025-12-12T00:00:00.000Z",
    "updatedAt": "2025-12-12T00:00:00.000Z"
  }
]

```
Notes

Используется для отображения списка товаров.
Возвращает упрощённую модель товара (без атрибутов и предложений).

### GET `/api/products/:id`

Возвращает детальную информацию о товаре.

Path params

id — идентификатор товара

**Response 200**

```json
{
  "id": "string",
  "title": "string",
  "slug": "string",
  "sku": "string",
  "description": "string",
  "image": {
    "url": "string",
    "alt": "string"
  },
  "bigImage": [
    {
      "url": "string",
      "alt": "string"
    }
  ],
  "price": {
    "amount": 0,
    "currency": "KGS"
  },
  "rating": 0,
  "category": "string",
  "tags": ["string"],
  "attributes": [
    {
      "attributeId": "string",
      "code": "string",
      "label": "string",
      "type": "'string' | 'number' | 'boolean' | 'color'",
      "value": "string",
      "unit": "string"
    }
  ],
  "offers": [
    {
      "id": "string",
      "productId": "string",
      "seller": "string",
      "rating?": "number",
      "stockQty?": "number",
      "price": {
        "amount": "number",
        "currency": "'KGS' | 'USD' | 'EUR'"
      },
      "deliveryDate": "string"
    }
  ],
  "createdAt": "2025-12-12T00:00:00.000Z",
  "updatedAt": "2025-12-12T00:00:00.000Z"
}


```
