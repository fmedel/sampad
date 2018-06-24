#include <OneWire.h> 
#include <DallasTemperature.h>
#include <Wire.h>
#include <BH1750FVI.h>

 
//Declaramos el pin donde se conectará el cable DATA del sensor 
#define Pin 2 // temp 
#define pinOut 7
//variables para el sensor de luz
uint16_t lux;
double tem;
BH1750FVI lightMeter;

 
//Declaramos el pin como bus para la comunicación OneWire 
OneWire ourWire(Pin); 
 
//Iniciamos 1 instancia de la librería DallasTemperature 
DallasTemperature sensors(&ourWire); 
 
//Esta funcion se ejecuta una sola vez cuando se inicia el Arduino 

void setup() {
  
  //Iniciamos la comunicacion serial
  Serial.begin(9600); 
  //Iniciamos el sensor
  sensors.begin();
  //configuramos el pin 7 como salida
  pinMode (pinOut, OUTPUT); 
  //configuracion del sensor de luz
  Wire.begin();
  lightMeter.begin();
  lightMeter.SetAddress(Device_Address_H); 
  lightMeter.SetMode(Continuous_H_resolution_Mode);
   //Pequeña pausa 
  delay(1000);

}
 
//Esta funcion se ejecuta continuamente en bucle 
void loop() {
  //Enviamos una petición al sensor para que nos devuelva la temperatura
  sensors.requestTemperatures(); 
  //Se lee e imprime la temperatura en grados Celsius en el monitor serie
  tem = sensors.getTempCByIndex(0);
  lux = lightMeter.GetLightIntensity();  
  Serial.print("{'temp':");
  Serial.print(tem); 
  Serial.print(",'lux':");
  Serial.print(lux);
  Serial.print(",'lampara':");
  if((tem<=25) and(lux<=20) ){
      Serial.println("1}");
      digitalWrite (pinOut, HIGH);
  }else{
      Serial.println("0}");
      digitalWrite (pinOut, LOW);
  }
  //Hacemos un delay de 1 segundo
  delay (500);
}

