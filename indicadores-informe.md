# Cómo armar el informe general en Google Sheets

Tu Google Sheet va a tener una hoja con los datos crudos (uno por persona, la que llena el formulario). Estos son los pasos para agregar una segunda hoja con los indicadores calculados y los gráficos.

Suponiendo que la hoja de datos se llama **"Hoja1"** y las columnas quedaron en este orden (según `apps-script.gs`):

| Columna | Campo |
|---|---|
| A | Fecha |
| B | Horario |
| C | Responsable |
| D | Nombre/Iniciales |
| E | Edad |
| F | Sexo |
| G | TA Sistólica |
| H | TA Diastólica |
| I | Resultado (Normal/Alterada) |
| J | Derivación Protegida Asignada |
| K | Asistió Módulo Movimiento |
| L | Observaciones |

## 1. Creá una hoja nueva llamada "Indicadores"

Click derecho en la pestaña de abajo > Insertar hoja > renombrala "Indicadores".

## 2. Pegá estas fórmulas

**Total de personas controladas**
```
=CONTAR(Hoja1!G2:G)
```

**Casos con TA alterada**
```
=CONTAR.SI(Hoja1!I2:I;"Alterada")
```

**Tasa de hallazgos con TA elevada (%)**
```
=CONTAR.SI(Hoja1!I2:I;"Alterada") / CONTAR(Hoja1!G2:G) * 100
```

**Derivaciones asignadas**
```
=CONTAR.SI(Hoja1!J2:J;"Sí")
```

**Efectividad de derivación médica (%)**
*(de los casos alterados, cuántos recibieron turno)*
```
=CONTAR.SI(Hoja1!J2:J;"Sí") / CONTAR.SI(Hoja1!I2:I;"Alterada") * 100
```

**Asistencia a módulos de movimiento**
```
=CONTAR.SI(Hoja1!K2:K;"Sí")
```

**Cobertura de tamizaje (%)**
*(necesita el total de asistentes en sala de espera, que no lo carga el formulario — reemplazá 100 por ese número real de cada jornada, o sumalo como dato aparte)*
```
=CONTAR(Hoja1!G2:G) / 100 * 100
```

## 3. Indicadores que requieren datos externos al formulario

Estos no salen de los registros individuales, así que hay que cargarlos aparte (a mano, en una celda):

- **Cumplimiento de jornadas CCSC**: jornadas ejecutadas ÷ jornadas programadas — llevar la cuenta manualmente.
- **Reducción del ausentismo**: inasistencias registradas ÷ turnos otorgados — sale de la estadística del CAPS, no del formulario.

## 4. Gráficos sugeridos

Seleccioná los datos y andá a `Insertar > Gráfico`:

- **Normal vs. Alterada**: gráfico de torta sobre la columna I (Resultado).
- **Casos alterados por edad**: gráfico de barras cruzando columna E (Edad, agrupada en rangos) con columna I.
- **Evolución en el tiempo**: gráfico de líneas con columna A (Fecha) en el eje X y cantidad de casos alterados por día en el eje Y (usá una tabla dinámica: `Insertar > Tabla dinámica`, filas = Fecha, valores = Contar de Resultado filtrado por "Alterada").
- **Derivación vs. no derivación** entre los casos alterados: gráfico de torta sobre columna J filtrando solo filas donde I = "Alterada".

## 5. Tip: tabla dinámica para el resumen completo

`Insertar > Tabla dinámica`, con:
- Filas: Fecha
- Columnas: Resultado
- Valores: Contar de Nombre/Iniciales

Esto te arma automáticamente una tabla con el total de personas controladas y cuántas dieron "Alterada" por día — la base de casi todos los indicadores de la Matriz.
