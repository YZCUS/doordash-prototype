# DoorDash Prototype (HCI Project)

This project is a prototype developed for a Human Computer Interaction (HCI) course, demonstrating the basic functionalities of a food delivery application like DoorDash.

## Live Demo

You can view the live deployment on Vercel: [https://doordash-prototype-allen-yaos-projects.vercel.app](https://doordash-prototype-allen-yaos-projects.vercel.app)

## Features

*   **User Authentication:** Login and Signup functionality.
*   **Restaurant/Store Browsing:**
    *   View various categories (food, convenience, grocery, etc.).
    *   See promotional ads and recommendations (Popular, Guess You Like).
    *   Switch between Delivery and Pickup modes.
*   **Store Details & Menu:** View individual store pages and add items to the cart.
*   **Shopping Cart:** Add, update quantity, remove items, and clear the cart.
*   **Order Simulation:** Includes order summary and receipt pages.
*   **User Profile & Activity:**
    *   View order history.
    *   Manage favorite stores.
    *   Access settings and logout.
    *   View recommendations.
*   **Address Selection:** Choose a delivery address (mocked).
*   **Basic Navigation:** Top and bottom navigation bars for easy access to different sections.

## Technologies Used

*   React
*   Vite

### Key Dependencies

*   `@radix-ui/react-slot`: For component primitives.
*   `tailwindcss`: For utility-first CSS styling.
*   `lucide-react`: For icons.
*   `clsx`, `tailwind-merge`: For conditional class names.
*   `class-variance-authority`: For managing component variants.

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/YZCUS/doordash-prototype.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd my-doordash-app
    ```
3.  Install NPM packages:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

```bash
npm run dev
# or
# yarn dev
```

This will start the Vite development server, typically accessible at `http://localhost:5173`. Open this URL in your browser to see the application.
