import requests

# URL de la API
url = 'http://localhost:5000/api/predict'

# Datos a enviar
data = {
    'review': '''
        Aunque el dispositivo parece prometedor, 
        la batería se agota rápidamente. Las fotos son aceptables, 
        pero la calidad de los videos no es buena, incluso con 4K y estabilización de imagen. 
        Es decepcionante, ya que el Realme 12 Pro 5G no ha cumplido con las expectativas en este aspecto.'''
}

# Hacer la solicitud POST
response = requests.post(url, json=data)

# Verificar la respuesta
if response.status_code == 200:
    print("Respuesta:", response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")
