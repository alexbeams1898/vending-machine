# ColaCo Vending Machine App

A web application that acts as a vending machine for the made-up soda company, ColaCo.

## How to set up

1. Clone this repository
2. `cd /vending-machine` (root directory)
3. Run `npm run installBoth` to install necessary packages
4. Run `npm start` to start application
5. Navigate to `http://localhost:3000/` to use vending machine

## How to use UI

Note: This vending machine makes sounds, so please make sure your sound is on when using.

The workflow for this vending machine is as follows:
1. Add enough funds for a soda in the soda list
2. Enter the soda's id in the dialog under "Select soda by ID". Also note that if you hover over a soda name, you can view the description of the soda.
3. Press the green "OK" button

You should now see that the correct soda file has been downloaded.

## How to use API

This API allows a user to view the current status of the vending machine and allows an **admin** to **restock a soda, update the price on a soda, add a new soda to the current list of sodas, and more**. All API calls in this application are triggered from the base URL `http://localhost:9000` e.g. `GET http://localhost:9000/admin/restock?id=01`

### Relevant API Calls

The '/sodas' endpoint is utilized by the vending machine to perform core functionality.

#### /sodas

**GET /sodas**
- Get current list of soda objects

**GET /sodas/funds**
- Used to get the total amount of funds currently added to the machine

**POST /sodas/funds**
- Used to set the total funds added to machine

Example: 
To set current funds to $3.75, use the following payload:
{
  "funds": 3.75
}

**POST /sodas/dispense?id={sodaID}**
- Subtracts 1 from the 'quantity' property of the soda, specified by {sodaId}
- No payload required

#### /admin

The '/admin' endpoint is used to perform actions that only a ColaCo admin is allowed to perform. Thus, these actions are not available in the UI.

**POST /admin/restock?id={sodaID}**
- Used to restock a soda, specified by {sodaID}.
- Throws an error if maxQuantity property is exceeded
- Returns up-to-date list of sodas

Example:
To add 10 sodas to the soda with the id '02', use the following:
url: `http://localhost:9000/admin/restock?id=02`
payload: {
  "numberOfSodas": 10
}

**POST /admin/updatePrice?id={sodaID}**
- Used to update the price of a soda, specified by {sodaID}.
- Returns up-to-date list of sodas
- **Must refresh UI for updated value to show**

Example:
To change the price of the soda with the id '03' to $2.75, use the following:
url: `http://localhost:9000/admin/updatePrice?id=02`
payload: {
  "newPrice": 2.75
}

**POST /admin/updateMax?id={sodaID}**
- Used to update the max amount that the soda is allowed to restock, specified by {sodaID}.
- Returns up-to-date list of sodas
- **Must refresh UI for updated value to show**

Example:
To change the max amount that soda with id '04' can restock to 200 sodas, use the following:
url: `http://localhost:9000/admin/updateMax?id=04`
payload: {
  "newMax": 200
}

**POST /admin/addSoda**
- Adds a new soda to the machine
- Returns up-to-date list of sodas
- Note: Will not work if payload does not use correct schema

Example:
To add a new soda called "Ale", use the following payload:
{
   "id": "05",
   "productName": "Ale",
   "description": "Description for Ale",
   "cost": 2,
   "quantity": 100,
   "maxQuantity": 150
}
