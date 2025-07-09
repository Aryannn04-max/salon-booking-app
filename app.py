from flask import Flask, render_template, request, jsonify
import json
from scraper import SalonScraper

app = Flask(__name__)

# Sample data - in a real app, this would be stored in a database
SALONS = {
    'hair_salon': {
        'name': 'Luxury Hair Studio',
        'services': ['Haircut', 'Hair Coloring', 'Hair Treatment', 'Styling']
    },
    'nails_salon': {
        'name': 'Elegant Nails',
        'services': ['Manicure', 'Pedicure', 'Nail Art', 'Gel Polish']
    },
    'spa': {
        'name': 'Serenity Spa',
        'services': ['Massage', 'Facial', 'Body Treatment', 'Waxing']
    }
}

@app.route('/')
def home():
    return render_template('index.html', salons=SALONS)

@app.route('/get_available_slots', methods=['POST'])
def get_available_slots():
    data = request.json
    salon_id = data.get('salon_id')
    service = data.get('service')
    
    # In a real app, we would use the scraper here
    # For now, return sample data
    sample_slots = [
        '2025-07-09 10:00 AM',
        '2025-07-09 11:30 AM',
        '2025-07-09 02:00 PM',
        '2025-07-09 04:30 PM'
    ]
    
    return jsonify({
        'status': 'success',
        'slots': sample_slots,
        'salon': SALONS.get(salon_id, {}).get('name', 'Unknown Salon'),
        'service': service
    })

@app.route('/book_appointment', methods=['POST'])
def book_appointment():
    data = request.json
    salon_id = data.get('salon_id')
    service = data.get('service')
    slot = data.get('slot')
    
    # In a real app, we would use the scraper to book the appointment
    print(f"Booking {service} at {salon_id} for {slot}")
    
    return jsonify({
        'status': 'success',
        'message': f'Successfully booked {service} at {SALONS.get(salon_id, {}).get("name", "the salon")} for {slot}'
    })

if __name__ == '__main__':
    app.run(debug=True)
