from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__, template_folder='templates')

# Load data from data.json file
with open('data.json', 'r') as file:
    data = json.load(file)
    
@app.route('/')
def index():
    return render_template('home.html')

@app.route('/api/ask', methods=['POST'])
def ask_question():
    try:
        # Get the question from the request
        question = request.json.get('question')

        # Process the question (for demonstration, let's just echo it)
        #response = f"You asked: {question}"
        # Search for the question in the data
        response = None
        for entry in data:
            if entry['question'] == question:
                response = entry['response']
                break

        if response is not None:
            # Return the response as JSON
            return jsonify({'response': response})
        else:
            return jsonify({'response': 'No matching response found for the question.'})
    except Exception as e:
        # Return an error response if something goes wrong
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
