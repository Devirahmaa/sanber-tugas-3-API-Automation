Sure! Here's a concise English version of the README for your GitHub repository:

```markdown
# API Automation Project

This project is part of SanberCode's API Automation assignment. It uses JavaScript with Mocha, Chai, and Supertest for API testing.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Tests](#api-tests)
  - [Customers](#customers)
  - [Units](#units)
  - [Categories](#categories)
- [Contribution](#contribution)
- [License](#license)

## Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/Devirahmaa/sanber-tugas-3-API-Automation.git
   cd sanber-tugas-3-API-Automation
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

## Project Structure

```
.
├── Customers
│   ├── createcustomer.js
│   ├── deletecustomer.js
│   ├── getcustomerdetail.js
│   ├── getcustomerlist.js
│   └── updatecustomer.js
├── Units
│   ├── alltestunit.js
│   ├── createunit.js
│   ├── deleteunit.js
│   ├── getunitdetail.js
│   ├── getunitlist.js
│   └── updateunit.js
├── Categories
│   ├── alltestcategory.js
│   ├── createcategory.js
│   ├── deletecategory.js
│   ├── getcategorydetail.js
│   ├── getcategorylist.js
│   └── updatecategory.js
├── alltests.js
├── package.json
└── README.md
```

## Usage

To run the tests, use:

```sh
npm test
```

Or run specific test files:

```sh
mocha Customers/alltestcustomer.js
```

## API Tests

### Customers

- `createcustomer.js`: Tests creating a new customer.
- `deletecustomer.js`: Tests deleting a customer.
- `getcustomerdetail.js`: Tests fetching customer details.
- `getcustomerlist.js`: Tests fetching the customer list.
- `updatecustomer.js`: Tests updating customer data.

### Units

- `alltestunit.js`: Runs all unit tests.
- `createunit.js`: Tests creating a new unit.
- `deleteunit.js`: Tests deleting a unit.
- `getunitdetail.js`: Tests fetching unit details.
- `getunitlist.js`: Tests fetching the unit list.
- `updateunit.js`: Tests updating unit data.

### Categories

- `alltestcategory.js`: Runs all category tests.
- `createcategory.js`: Tests creating a new category.
- `deletecategory.js`: Tests deleting a category.
- `getcategorydetail.js`: Tests fetching category details.
- `getcategorylist.js`: Tests fetching the category list.
- `updatecategory.js`: Tests updating category data.

## Contribution

Feel free to fork this repository and submit pull requests. Make sure to describe your changes clearly.

## License

This project is licensed under the [MIT License](LICENSE).
```

This concise README should cover the essential details of your project. Adjust the URLs and specific details as needed.
