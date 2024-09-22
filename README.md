# URL Shortener API

This project is a simple URL shortener API that allows users to shorten long URLs and retrieve the shortened URLs. It includes functionality to create, retrieve, update, delete, list, and search shortened URLs.

## Features

- **Create** a shortened URL from a long URL.
- **Retrieve** the original URL using the shortened URL.
- **Update** a shortened URL's associated long URL.
- **Delete** a shortened URL.
- **List** all shortened URLs with pagination and sorting.
- **Search** for shortened URLs using a search term.
- **Track** views for each shortened URL.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## Endpoints

### 1. Create a Shortened URL

**Endpoint:** `POST /api/`  
**Description:** Creates a shortened URL from a long URL. If the URL already exists, it returns the existing shortened URL.

#### Request Body:
```json
{
  "url": "https://example.com/very-long-url"
}
```
#### Response
- **201 Created**: Returns the newly created shortened URL.
- **200 OK**: If the URL already exists, returns the existing shortened URL.

### 2. Retrieve a Shortened URL

**Endpoint**: `GET /api/:shortCode`
**Description**: Retrieves the original URL for the given shortCode. If the mode=edit query parameter is provided, it returns the shortened URL without redirection.

#### Query Parameters:
- `mode=edit` (optional): Returns the shortened URL details instead of redirecting.
#### Response:
- `200 OK`: Redirects to the original URL or returns the shortened URL details.
- `404 Not Found`: If the shortened URL is not found.

### 3. Update a Shortened URL
**Endpoint**: `PUT /api/:shortCode`
**Description**: Updates the long URL associated with the given shortCode.

#### Request Body:
```bash
{
  "url": "https://example.com/new-long-url"
}
```
#### Response:
- `200 OK`: Returns the updated shortened URL.
- `404 Not Found`: If the shortened URL is not found.

### 4. Delete a Shortened URL
**Endpoint**: `DELETE /api/:shortCode`
**Description**: Deletes the shortened URL with the given shortCode.

#### Response:
- `204 No Content`: Successful deletion.
- `404 Not Found`: If the shortened URL is not found.

### 5. List Shortened URLs (with Pagination & Sorting)
**Endpoint**: `GET /api/`
**Description**: Lists all shortened URLs with pagination and sorting. The list is sorted by the number of views by default.

#### Query Parameters:
- `page` (optional, default: 1): Page number for pagination.
- `limit` (optional, default: 10): Number of results per page.
- `sort` (optional, default: '-views'): Sort order for results.

#### Response:
- `200 OK`: Returns the paginated and sorted list of shortened URLs.

### 6. Search for Shortened URLs
**Endpoint**: `GET /api/search`
**Description**: Searches for shortened URLs by a search term.

### Query Parameters:
**searchTerm**: The term to search for in URLs.
Response:
- `200 OK`: Returns the list of URLs matching the search term.
