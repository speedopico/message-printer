from flask import Flask, request, jsonify
from escpos.printer import Network

app = Flask(__name__)

@app.route('/print', methods=['POST'])
def print_message():
    data = request.get_json()
    message = data.get('message', '')

    if not message:
        return jsonify({"message": "No message provided."}), 400

    # Replace with your printer's IP address
    printer_ip = "192.168.68.106"

    try:
        p = Network(printer_ip)
        p.text(message)
        p.cut()
        return jsonify({"message": "Message sent to printer."})
    except Exception as e:
        return jsonify({"message": f"Error printing message: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
