# Travel Management System - Assignment Completion

## Overview

The project includes functionalities for managing passengers, flights, and bookings, all integrated with a MongoDB database through a RESTful API.

## Implementation Details

### 1. Passengers Management

- **Core Details**:  Passenger details such as Title, First Name, Surname, Phone Number, Email Address, and Home Address.
- **Validation**: All required fields are validated.
- **Dynamic Input**: An additional text input appears when "Other" is selected for the Title field.

### 2. Flights Management

- **Core Details**: The form captures flight details including Aircraft Type, Pilot and Co-pilot Names, Flight Number, Home Country, and Cabin Crew.
- **Validation**: All required fields are validated.
- **Dynamic Input**: An additional text input appears when "Other" is selected for the Title field.
  
### 3. Bookings Management

- **Core Details**: Booking details include Booking Date, Departure and Arrival Countries, Passenger(s), Flight, Estimated Length of Flight, Flight Type, Number of Crew Members, and Complimentary Drink.
- **Passenger and Flight Constraints**: The booking form allows selecting up to 10 passengers and exactly one flight.
- **Manual Date Entry**: The booking date is manually set, with no automated current date calculation.

### 4. API and Database

- **CRUD Operations**: Implemented CRUD functionality for passengers, flights, and bookings using Node.js, Express, and MongoDB.
- **Database**: Used MongoDB Atlas for storing data.

### 5. User Interface

- **React and Tailwind CSS**: The frontend is built using React and styled with Tailwind CSS.
- **Navigation**: The UI includes navigation links for managing passengers, flights, and bookings.

### 6. Testing and Validation

- **Postman**: The API was tested using Postman to ensure all CRUD operations work as expected.
- **Cross-Browser Testing**: The application was tested on Google Chrome and Mozilla Firefox.

