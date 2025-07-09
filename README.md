# Salon Booking Application

A web application that allows users to search for salon services, check available time slots, and book appointments. The application uses Selenium to scrape salon websites for real-time availability.

## Features

- **Salon Selection**: Choose from a list of available salons
- **Service Selection**: View and select from available services at each salon
- **Real-time Availability**: Check available time slots for the selected service
- **Appointment Booking**: Book appointments with customer details
- **Responsive Design**: Works on both desktop and mobile devices

## Prerequisites

- Python 3.8 or higher
- Google Chrome browser installed
- ChromeDriver (automatically installed by webdriver-manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/salon-booking-app.git
   cd salon-booking-app
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. **Environment Variables**
   Create a `.env` file in the project root and add any required environment variables:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   ```

## Running the Application

1. **Start the Flask development server**
   ```bash
   flask run
   ```

2. **Access the application**
   Open your web browser and navigate to `http://localhost:5000`

## Project Structure

```
salon-booking-app/
├── app.py                # Main Flask application
├── scraper.py           # Selenium web scraper
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
├── static/              # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css   # Custom styles
│   └── js/
│       └── script.js   # Frontend JavaScript
└── templates/
    └── index.html      # Main HTML template
```

## Customizing for Different Salons

To add support for a new salon:

1. Update the `SALONS` dictionary in `app.py` with the salon's information
2. Modify the `get_available_slots` and `book_appointment` methods in `scraper.py` to handle the specific website structure of the salon

## Troubleshooting

- **ChromeDriver Issues**: If you encounter ChromeDriver errors, make sure you have the latest version of Google Chrome installed.
- **SSL Certificate Errors**: Some websites might have SSL certificate issues. You may need to modify the Selenium options to handle these cases.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
