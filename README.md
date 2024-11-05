# CodeTribe Marketplace

## Overview
CodeTribe Academy is launching an online marketplace for users to list and browse products for sale. This project builds the Minimum Viable Product (MVP) using Node.js for the backend and React.js for the frontend. The marketplace allows users to create accounts, list products, manage their inventory, and make purchases seamlessly.

## Project Parts
1. **Backend (Node.js)**: RESTful API for product management and user authentication.
2. **Frontend (React.js)**: User interface for registration, login, product browsing, and purchasing.

## Requirements

### Backend Development (Node.js)
1. **User Authentication**: 
   - Register and log in users securely.
  
2. **Product Management**:
   - Create, read, update, delete, and hide products.

3. **Database**:
   - Use Firebase for data storage.

### Frontend Development (React.js)
1. **User Authentication**: 
   - Login and registration pages.

2. **Product Listing**: 
   - Display marketplace products.

3. **Add a Product**: 
   - Form to add new products.

4. **Update Product Availability**: 
   - Users can update product details.

5. **Delete Product**: 
   - Users can delete products.

6. **Hide Product**: 
   - Option to hide products.

7. **Cart and Checkout**: 
   - Implement cart functionality.

8. **Additional Features**: 
   - Include any other important features.

## Deliverables

### Node.js Backend
- Functional REST API hosted locally or on a cloud platform.
- API documentation (README or Swagger).
- Database setup and connection script.

### React.js Frontend
- Responsive web application that communicates with the backend.
- Login and registration pages.
- Product listing and addition features.

### Hosting
- Both frontend and backend must be hosted.

## Tools Used
- **Backend**: Node.js, Express, JWT, Firebase.
- **Frontend**: React.js, Axios.
- **Version Control**: Git.
- **State Management**: Redux.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- Firebase database set up.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DopeGrammerZA/Online-Store.git
   ```

2. **Backend Setup**:
   - Go to the backend folder:
     ```bash
     cd backend
     ```
   - Go to dev branch:
     ```bash
     git checkout dev
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     node server.js
     ```

3. **Frontend Setup**:
   - Go to the frontend folder:
     ```bash
     cd frontend
     ```
    - Go to dev branch:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React app:
     ```bash
     npm run dev
     ```

## API Documentation
- Access the API at `http://localhost:5000/api` (or the cloud URL if deployed).
  
The base URL for the API is:
```
http://localhost:5000/api  (or your deployed URL)
```

### Authentication
All endpoints require authentication. Use the following methods to authenticate:
- **Login**: Obtain a JWT token by sending a POST request to `/auth/login`.

### Using the API

#### Example of Using Fetch with API

Here’s how you can consume the API using Fetch in JavaScript:

```javascript

const getProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: {
            'Authorization': `ThisIsMyPassword`, 
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};


getProducts().then(products => console.log(products));
```

### API Endpoints

| Endpoint                         | Method  | Description                              | Request Body                      | Response                  |
|----------------------------------|---------|------------------------------------------|-----------------------------------|---------------------------|
| `/auth/register`                 | POST    | Register a new user                      | `{ "email": "user@example.com", "password": "yourpassword" }` | `{ "message": "User registered successfully." }` |
| `/auth/login`                    | POST    | Login user and receive JWT token        | `{ "email": "user@example.com", "password": "yourpassword" }` | `{ "token": "JWT_TOKEN" }` |
| `/api/products`                  | GET     | Retrieve all products                    | N/A                               | `[ { "id": 1, "name": "Product Name", ... }, ... ]` |
| `/api/products/:id`              | GET     | Retrieve a product by ID                 | N/A                               | `{ "id": 1, "name": "Product Name", ... }` |
| `/api/products`                  | POST    | Create a new product                     | `{ "name": "Product Name", "description": "Description", "price": 100, ... }` | `{ "message": "Product created successfully.", "product": { ... } }` |
| `/api/products/:id`             | PUT     | Update an existing product               | `{ "name": "Updated Product Name", "description": "Updated Description", ... }` | `{ "message": "Product updated successfully." }` |
| `/api/products/:id`             | DELETE  | Delete a product                         | N/A                               | `{ "message": "Product deleted successfully." }` |
| `/api/products/hide/:id`        | POST    | Hide a product                           | N/A                               | `{ "message": "Product hidden successfully." }` |

### Response Format
All responses from the API will be in JSON format. 

### Error Handling
If an error occurs, the API will respond with an appropriate HTTP status code and a message. Example response for an error:
```json
{
    "error": "User not found."
}
```

## Conclusion
This project demonstrates full-stack development skills for creating an online marketplace.



Figma link: https://www.figma.com/design/swPUg5rv0GdA7sOSVaxG23/Untitled?node-id=0-1&node-type=canvas&t=ZCRK19p61Zg5prih-0