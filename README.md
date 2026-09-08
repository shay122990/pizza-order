# 🍕 Pizza Ordering App

A pizza ordering application built with **React** and **React Router**, created as a hands-on project for learning modern React Router patterns and building a realistic client-side application.

The app allows users to browse a pizza menu, add pizzas to their cart, create orders, and look up existing orders.

The main focus of this project is understanding how **modern React Router** handles routing, nested routes, route-level data loading, URL parameters, navigation, errors, and forms.

---

## 🚀 What the App Does

Users can:

- Browse the pizza menu
- View available pizzas and their details
- Add pizzas to a cart
- Adjust quantities in the cart
- Create a new pizza order
- Provide customer/order information
- Submit an order
- Receive an order ID
- Look up an existing order using its order ID
- Navigate between different parts of the application
- See route-level error messages when something goes wrong

---

## 🧭 Routing

The application uses React Router's modern `createBrowserRouter` API.

The main router is structured with a shared layout and nested routes:

```js
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);
```

### Nested Routes

Instead of rendering the entire application from scratch for every URL, the routes are nested under `AppLayout`.

This allows the application to have a shared layout while individual routes render inside it.

The structure is essentially:

```text
AppLayout
│
├── /
│   └── Home
│
├── /menu
│   └── Menu
│
├── /cart
│   └── Cart
│
├── /order/new
│   └── CreateOrder
│
└── /order/:orderId
    └── Order
```

`AppLayout` uses React Router's `Outlet` to determine where the active child route should render.

```jsx
<main>
  <Outlet />
</main>
```

---

# 📡 Route Loaders

One of the main concepts explored in this project is **route-level data loading**.

The menu route has a loader:

```js
{
  path: "/menu",
  element: <Menu />,
  loader: menuLoader,
}
```

The loader is responsible for fetching the menu data before the route renders.

```js
export async function loader() {
  const menu = await getMenu();
  return menu;
}
```

The component then accesses that data with:

```js
const menu = useLoaderData();
```

This creates a flow like:

```text
User navigates to /menu
        ↓
React Router runs loader()
        ↓
loader() calls getMenu()
        ↓
Menu data is returned
        ↓
Menu component renders
        ↓
useLoaderData() provides the data
```

This is different from the traditional approach of fetching data inside `useEffect`.

Instead of:

```jsx
useEffect(() => {
  fetchMenu();
}, []);
```

the route itself declares the data it needs.

---

# 📦 `useLoaderData()`

`useLoaderData()` allows a route component to access the data returned by its loader.

For example:

```js
function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
```

The important relationship is:

```text
loader()
   ↓
return data
   ↓
useLoaderData()
   ↓
component
```

The component doesn't need to manually initiate the request.

---

# ❌ Route Error Handling

The application also uses React Router's route-level error handling.

The router defines:

```js
errorElement: <Error />;
```

If something goes wrong while rendering a route, loading its data, or processing a route action, React Router can render the error element.

The error component uses:

```js
const error = useRouteError();
```

This gives the component access to the error that caused the route to fail.

For example:

```jsx
function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

This provides a centralized way of handling route errors instead of manually handling every possible failure inside every component.

---

# 🔗 Dynamic Routes

The application uses dynamic route parameters for individual orders:

```js
{
  path: "/order/:orderId",
  element: <Order />,
}
```

`:orderId` is a dynamic URL parameter.

For example:

```text
/order/ABC123
/order/456
/order/xyz789
```

The value can be accessed with React Router's `useParams()`:

```js
const { orderId } = useParams();
```

This allows the application to determine which order the user wants to view based on the URL.

---

# 🧭 Navigation

Navigation is handled through React Router rather than manually manipulating browser URLs.

The application can use components such as:

```jsx
<Link to="/menu">Menu</Link>
```

and:

```jsx
<Link to="/cart">Cart</Link>
```

React Router handles the navigation without requiring a full page reload.

The application can also use programmatic navigation with:

```js
const navigate = useNavigate();
```

For example:

```js
navigate("/order/ABC123");
```

---

# 🛒 Cart

The cart allows users to:

- Add pizzas
- Remove pizzas
- Increase quantities
- Decrease quantities
- View the total price
- Continue to checkout/order creation

The cart data is kept available while navigating through the application.

---

# 📝 Creating Orders

The `/order/new` route contains the order form:

```js
{
  path: "/order/new",
  element: <CreateOrder />,
}
```

Users can enter their information and submit their pizza order.

The order is then sent to the backend/API and an order ID is generated.

The user can subsequently access the order through:

```text
/order/:orderId
```

---

# 🔍 Order Lookup

The dynamic order route allows users to view an order by its ID:

```js
{
  path: "/order/:orderId",
  element: <Order />,
}
```

For example:

```text
/order/ABC123
```

The `Order` component can retrieve the ID using:

```js
const { orderId } = useParams();
```

This demonstrates how URL state can be used to identify resources.

---

# 🧱 Shared Layouts

The application uses an `AppLayout` component as the parent route.

```js
{
  element: <AppLayout />,
  children: [...]
}
```

The layout contains the parts of the application that should remain consistent between routes, such as:

- Header
- Navigation
- Cart overview
- Main content area

The child route is rendered through:

```jsx
<Outlet />
```

This demonstrates React Router's nested routing system.

---

# 🌐 API / Data Layer

API communication is separated from the UI components.

For example:

```js
import { getMenu } from "../../services/apiRestaurant";
```

The API/service layer is responsible for communicating with the backend.

The route loader then uses that service:

```js
export async function loader() {
  return await getMenu();
}
```

This creates a separation between:

```text
React Router
    ↓
Loader
    ↓
API / Service
    ↓
Backend
```

---

# 🧠 React Router Concepts Practiced

This project is primarily a learning project for understanding modern React Router.

Concepts covered include:

### Router

```js
createBrowserRouter();
```

Creating the application's route configuration.

### Nested Routes

```js
children: [...]
```

Organizing routes under shared layouts.

### Layout Routes

```jsx
<AppLayout />
```

Creating a common application structure.

### `Outlet`

```jsx
<Outlet />
```

Rendering the currently matched child route.

### Route Elements

```js
element: <Menu />;
```

Defining which component renders for a route.

### Route Loaders

```js
loader: menuLoader;
```

Loading route data before rendering.

### `useLoaderData`

```js
const menu = useLoaderData();
```

Accessing loader data inside a route component.

### Error Elements

```js
errorElement: <Error />;
```

Defining a route-level error UI.

### `useRouteError`

```js
const error = useRouteError();
```

Accessing the error associated with a failed route.

### Dynamic URL Parameters

```js
/order/:orderId
```

Creating routes containing dynamic values.

### `useParams`

```js
const { orderId } = useParams();
```

Reading dynamic URL parameters.

### Links

```jsx
<Link to="/menu">
```

Declarative navigation.

### Programmatic Navigation

```js
const navigate = useNavigate();
```

Navigating through JavaScript when necessary.

### Route-Based Data Fetching

Instead of fetching data exclusively inside components, the router can manage data required by a route.

---

# 🗂️ Project Structure

A simplified structure looks like:

```text
src/
│
├── features/
│   ├── menu/
│   │   ├── Menu.jsx
│   │   └── MenuItem.jsx
│   │
│   ├── cart/
│   │   └── Cart.jsx
│   │
│   ├── order/
│   │   ├── CreateOrder.jsx
│   │   └── Order.jsx
│   │
│   └── home/
│       └── Home.jsx
│
├── services/
│   └── apiRestaurant.js
│
├── ui/
│   ├── AppLayout.jsx
│   └── Error.jsx
│
└── App.jsx
```

The exact structure may evolve as the project grows.

---

# 🎯 Purpose of the Project

This application is more than just a pizza ordering interface.

The primary goal is to understand how to build a realistic React application using modern routing patterns.

The project provides practical experience with:

- Route configuration
- Nested routing
- Layout routes
- Data loading
- Route-level errors
- Dynamic routes
- URL parameters
- Navigation
- Forms
- API requests
- Application state
- Component composition
- Separation of UI and data-access logic

The goal is to understand **why** these patterns exist and how they fit together in a real React application, rather than simply memorizing individual APIs.

---

## 🛠️ Tech Stack

- React
- React Router
- JavaScript
- Vite
- REST API
- Tailwind CSS

---

## 📚 Learning Focus

The application is intentionally built around modern React Router concepts, particularly the **data router** approach.

The key idea is that routing is not only responsible for deciding **which component to render**.

It can also coordinate:

```text
Routing
   +
Data Loading
   +
Errors
   +
URL Parameters
   +
Navigation
   +
Forms / Mutations
```

This makes the router an important part of the application's architecture rather than simply a URL-to-component mapping system.
