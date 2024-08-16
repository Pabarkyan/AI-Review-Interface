from flask_cors import CORS
from flask import Flask, request, jsonify

from AI_percentage import ai_guess
from review_features import review_builder

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify(message="Hello, World!")

@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify({"message": f"Connection successful!"}), 200

@app.route('/api/predict', methods=['POST'])
def predict_prob():
    try:
        data = request.json
        review_fronted = data.get('review', '')
        
        review = review_builder(review=review_fronted) # lo transformamos al mismo formato que los datos de entrenamiento en forma de dataframe
        probability_ia = ai_guess(review=review) # obtenemos la prediccion en porcentaje

        return jsonify({ # lo ponemos en forma de diccionario porque podria ser util añadir mas datos en el return (en un futuro)
            'probability': f'{probability_ia}% de ser ia',
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
