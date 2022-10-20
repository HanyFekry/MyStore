this is a simple single-page application with angular for shopping process
- ng new MyStore to create new angular application from scratch
- ng g c component-name (product-list, product-list-item, etc...) to add component
- ng g g service (product,cart)to add the service and register it in app.module
- ng serve --port 4444

components: //in components folder
- product-list : home page and displays products tp buy
- product-item: child component from product-list and diplays a single product
- product-item-detail: displays dore details about a product and uses parameter routing
- cart: displays order items and total price and allows user to submit order and validates user inputs
- confirmation: notifies user about order status.

services:
- product service: uses Observable to fetch data from local json file
- cart service: uses LocalStorage to temporary store data

*bootstrap is used for styling

thanks
