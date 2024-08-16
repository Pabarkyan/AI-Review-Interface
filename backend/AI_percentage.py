import pickle

import pandas as pd
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences


# Para calcular una prediccion necesitamos: el modelo y el max_length, el scaler y el tokenizer de los datos de entrenamiento
model = load_model('model/modelo_LSTM.h5')
with open('model/datos_preprocesados.pkl', 'rb') as file:
    data = pickle.load(file)
    scaler = data['scaler']
    tokenizer = data['tokenizer']
    max_length = data['max_length']


# Obtendra como parametro un daraframe identico a los datos de entrenamiento
def ai_guess(review: pd.DataFrame) -> float:
    # Procesar la reseña de texto
    sequence = tokenizer.texts_to_sequences(review['reseñas'])
    padded_sequence = pad_sequences(sequence, maxlen=max_length, padding='post')

    # Extraer y escalar las características numéricas
    numeric_features = review.drop(columns=['reseñas'])
    scaled_features = scaler.transform(numeric_features)

    # Hacer la predicción
    prediction = model.predict([scaled_features, padded_sequence])
    probability = float(prediction[0][0]) * 100

    return probability
