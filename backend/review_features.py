# Necesitamos transformar una reseña en texto en un dataframe identico a los datos de entrenamiento, usaremos una funcion

import pandas as pd
import numpy as np

from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

from textblob import TextBlob
import string

def obtener_longitud_promedio(reseña: str):
    palabras = word_tokenize(reseña.lower()) # Separamos el texto en palabras
    promedio = sum(len(word) for word in palabras) / len(palabras) # Hacemos el len de cada palabra de todas las palabras
    return promedio

def frecuencia_palabras_unicas(reseña: str):
    palabras = word_tokenize(reseña.lower()) 
    frecuencia = len(set(palabras)) / len(palabras)
    return frecuencia

def frecuencia_signos_de_puntuacion(reseña: str):
    frecuencia = sum(1 for char in reseña if char in string.punctuation) # Si hay un signo de puntuación suma 1
    return frecuencia

def frecuencia_pronombres(reseña: str):
    palabras = word_tokenize(reseña.lower()) 
    pronombres = ['yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas', 'nosotras', 'vosotras']
    frecuencia = sum(1 for word in palabras if word in pronombres)
    return frecuencia

nltk.download('punkt')
def variedad_lexica(reseña: str):
    palabras = word_tokenize(reseña)
    palabras_unicas = set(palabras)
    frecuencia = len(palabras_unicas) / len(palabras)
    return frecuencia

def entropia_lexica(reseña: str):
    palabras = word_tokenize(reseña)
    conteo_palabras = Counter(palabras)
    palabras_totales = len(palabras)
    probab = [count / palabras_totales for count in conteo_palabras.values()]
    entropia = -sum(p * np.log2(p) for p in probab)
    return entropia

def calcular_tfidf(reseña):
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform([reseña])
    tfidf_values = X.toarray()[0]
    desviacion_estandar = np.std(tfidf_values)
    return desviacion_estandar

def contar_palabras_complejas(reseña: str):
    palabras_complejas = [palabra for palabra in reseña.split() if len(palabra) > 10]  # Ejemplo: palabras más largas
    return len(palabras_complejas)

def contar_palabras_tecnicas(reseña, tecnicismos):
    tecnicas_count = {termino: reseña.lower().count(termino) for termino in tecnicismos}
    cantidad_tecnicismos = sum(1 for count in tecnicas_count.values() if count > 0)

    return cantidad_tecnicismos

tecnicismos_resenas_productos = [
    "Calidad",
    "Desempeño",
    "Durabilidad",
    "Fiabilidad",
    "Ergonomía",
    "Usabilidad",
    "Estética",
    "Innovación",
    "Funcionalidad",
    "Eficiencia",
    "Confiabilidad",
    "Costo-beneficio",
    "Accesibilidad",
    "Portabilidad",
    "Adaptabilidad",
    "Mantenimiento",
    "Seguridad",
    "Sostenibilidad",
    "Comodidad",
    "Resistencia",
    "Potencia",
    "Precisión",
    "Versatilidad",
    "Robustez",
    "Autonomía",
    "Interfaz",
    "Actualización",
    "Intuitividad",
    "Compatibilidad",
    "Personalización",
    "Diseño",
    "Acabado",
    "Capacidad",
    "Performance",
    "Retroalimentación",
    "Eficiencia_energética",
    "Consumo",
    "Temperatura",
    "Rendimiento_térmico",
    "Velocidad",
    "Tiempo_de_respuesta",
    "Consumo_de_recursos",
    "Manejabilidad",
    "Adherencia",
    "Impermeabilidad",
    "Capacidad_de_carga",
    "Duración",
    "Estabilidad",
    "Resistencia_al_desgaste",
    "Facilidad_de_instalación",
    "Compatibilidad_con_sistemas",
    "Reducción_de_ruido",
    "Eco-amigable",
    "Tamaño",
    "Peso",
    "Facilidad_de_uso",
    "Insonorización",
    "Antibacteriano",
    "Antideslizante",
    "Resistencia_a_la_corrosión",
    "Resistencia_a_la_tracción",
    "Facilidad_de_limpieza",
    "Tecnología",
    "Innovación",
    "Eficiencia_energética",
    "Innovación",
    "Compatibilidad",
    "Precisión",
    "Estabilidad",
    "Fiabilidad",
    "Interfaz_de_usuario",
    "Ergonomía",
    "Capacidad_de_carga",
    "Integración",
    "Durabilidad",
    "Resistencia_al_agua",
    "Seguridad_al_usuario",
    "Eficiencia_en_el_uso_de_energía",
    "Fácil_mantenimiento",
    "Sostenibilidad_ambiental",
    "Resistencia_al_impacto",
    "Comodidad_de_uso",
    "Estabilidad_de_conexión",
    "Funcionalidad_multimedia",
    "Desempeño_en_condiciones_extremas",
    "Facilidad_de_ensamblaje",
    "Optimización_de_espacio",
    "Compatibilidad_de_formatos",
    "Protección_de_datos",
    "Facilidad_de_configuración",
    "Control_de_energía",
    "Compatibilidad_de_sistemas",
    "Escalabilidad",
    "Interoperabilidad",
    "Capacidad_de_expansión",
    "Facilidad_de_gestión",
    "Capacidad_de_procesamiento",
    "Conectividad",
    "Eficiencia_operativa",
    "Fiabilidad_de_datos",
    "Reciclabilidad",
    "Resistencia_al_fuego",
    "Calibración",
    "Funcionalidad_remota",
    "Estabilidad_de_software",
    "Compatibilidad_de_protocolos",
    "Innovación_tecnológica",
    "Estrategia_de_mercado",
    "Gestión_de_inventario",
    "Optimización_de_costos",
    "Adaptación_al_usuario",
    "Procesamiento_de_datos",
    "Análisis_de_datos",
    "Interacción_usuario-máquina",
    "Estabilidad_de_red",
    "Optimización_de_rendimiento",
    "Seguridad_de_la_información",
    "Cumplimiento_de_normativas",
    "Ajuste_personalizado",
    "Control_de_calidad"
]
for indice, tecnicismo in enumerate(tecnicismos_resenas_productos):
    tecnicismos_resenas_productos[indice] = tecnicismo.replace("_", " ")

def calcular_polaridad(reseña: str):
    blob = TextBlob(reseña)
    return blob.sentiment.polarity

def calcular_subjetividad(reseña: str):
    blob = TextBlob(reseña)
    return blob.sentiment.subjectivity

nltk.download('stopwords')
nltk.download('punkt')
def calcular_coherencia_tematica(reseña: str):
    stop_words = set(stopwords.words('spanish')) # Esto proporciona una lista de palabras muy comunes en el español que no sirven para lo que queremos analizar
    words = word_tokenize(reseña.lower())
    palabras_filtradas = [word for word in words if word.isalnum() and word not in stop_words]
    text = nltk.Text(palabras_filtradas)
    cohesion = len(set(text)) / len(text)
    return cohesion


def review_builder(review: str) -> pd.DataFrame:
    reviews = pd.DataFrame({'reseñas': [review]})
    reviews['longitud'] = reviews['reseñas'].apply(lambda x: len(x))
    reviews['longitud_promedio'] = reviews['reseñas'].apply(lambda x: obtener_longitud_promedio(x))
    reviews['palabras_unicas'] = reviews['reseñas'].apply(lambda x: frecuencia_palabras_unicas(x))
    reviews['signos_de_puntuación'] = reviews['reseñas'].apply(lambda x: frecuencia_signos_de_puntuacion(x))
    reviews['frecuencia_pronombres'] = reviews['reseñas'].apply(lambda x: frecuencia_pronombres(x))
    reviews['variedad_lexica'] = reviews['reseñas'].apply(lambda x: variedad_lexica(x))
    reviews['entropia_lexica'] = reviews['reseñas'].apply(lambda x: entropia_lexica(x))
    reviews['tfidf'] = reviews['reseñas'].apply(lambda x: calcular_tfidf(x))
    reviews['palabras_complejas'] = reviews['reseñas'].apply(lambda x: contar_palabras_complejas(x))
    reviews['tecnicismos'] = reviews['reseñas'].apply(lambda x: contar_palabras_tecnicas(x, tecnicismos_resenas_productos))
    reviews['polaridad'] = reviews['reseñas'].apply(lambda x: calcular_polaridad(x))
    reviews['subjetividad'] = reviews['reseñas'].apply(lambda x: calcular_subjetividad(x)) 
    reviews['coherencia'] = reviews['reseñas'].apply(lambda x: calcular_coherencia_tematica(x))

    return reviews