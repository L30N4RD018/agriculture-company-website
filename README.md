# Agriculture Company

## Overview

An agriculture company operates systems for growing, processing, distribution, and fleet management inherited through mergers. Currently, data is isolated in silos, limiting insights and optimization. Inventory management and distribution coordination are challenging due to this fragmentation.

## Challenges

The fragmented systems restrict the company's ability to make data-driven decisions across the agriculture value chain. For example, cultivation plans are based on isolated data rather than insights from downstream supply chain, inventory, and sales data. This results in over or underproduction and inefficient distribution. The company needs to share data across the seed-to-shelf process to boost yields, reduce waste, and cut costs.

## Solution

The proposed solution involves identifying microservices aligned with agriculture capabilities such as cultivation management and inventory. These microservices will expose relevant farming and inventory data via APIs managed by a gateway. This data will be streamed to a cloud analytics platform for AI optimization. This approach incrementally decomposes siloed systems over time into focused, decoupled services that deliver unified data access through managed APIs.

## Benefits

- **Improved Decision Making**: Unified data access enables data-driven decisions across the agriculture value chain.
- **Increased Efficiency**: Optimized cultivation plans and distribution reduce overproduction and waste.
- **Cost Reduction**: Streamlined processes and better inventory management lower operational costs.

## Web Application

The web application is built using modern web technologies including React for the frontend and Node.js for the backend. It provides an intuitive interface for managing cultivation, inventory, and distribution data.

### Requirements

To run the web application locally, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/L30N4RD018/agriculture-company-website.git
    ```
2. Navigate to the project directory:
    ```sh
    cd agriculture-company-website
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables:
    ```sh
    NEXT_PUBLIC_API_URL='...'
    NEXTAUTH_SECRET=no-use-this-in-production
    ```
5. Start the application:
    ```sh
    npm start
    ```

## Conclusion

By transitioning to a microservices architecture and leveraging cloud analytics, the agriculture company can overcome current challenges and achieve significant improvements in efficiency, cost management, and decision-making capabilities.