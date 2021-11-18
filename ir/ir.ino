#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

#include <SocketIoClient.h>

#define USE_SERIAL Serial

SocketIoClient webSocket;

const uint16_t kIrLed = 4;
const char *ssid = "minh";
const char *password = "minh2345";
int list[100];
IRsend irsend(kIrLed);
void event(const char *payload, size_t length)
{
  int a = (int)payload[0] - 48;
  for (int i = 1; i < strlen(payload); i++)
  {
    a = a * 10 + ((int)payload[i] - 48);
  };
  irsend.sendNEC(a);
}

String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;

  for (int i = 0; i <= maxIndex && found <= index; i++)
  {
    if (data.charAt(i) == separator || i == maxIndex)
    {
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i + 1 : i;
    }
  }
  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
void fuji(const char *payload, size_t length)
{
  int tbits = getValue(payload, ',', 0).toInt();
  uint16_t data[tbits];
  for (int i = 1; i < tbits + 1; i++)
  {
    data[i - 1] = getValue(payload, ',', i).toInt();
  }
  uint16_t bits = tbits;
  irsend.sendRaw(data, bits, 38);
}
void setup()
{
  irsend.begin();
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);
  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();
  for (uint8_t t = 4; t > 0; t--)
  {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println(WiFi.localIP());
  webSocket.on("led", event);
  webSocket.on("air", fuji);
  webSocket.begin("192.168.50.214", 3001);
  webSocket.setAuthorization("username", "password");
}

void loop()
{
  webSocket.loop();
}
