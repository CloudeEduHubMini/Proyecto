# PROYECTO
Repositorio de dedicado a los despliegues continuo de la plataforma educativa híbrida funcional (IaaS + PaaS + SaaS).

## Diagnóstico inicial
Según el diagnóstico TecNM (Cloud Gaps México 2025), existe una brecha de adopción en infraestructura cloud híbrida y servicios SaaS educativos en México. Este proyecto busca desarrollar una plataforma educativa mínima usando Azure Free Tier para cubrir habilidades en IaaS, PaaS y SaaS con integración a Microsoft Teams.


# DÍA 1: FUNDAMENTACIÓN + PLANEACIÓN (Arquitectura)

## Blueprint
(Ver carpeta /Blueprint)

Día 1: Infra + Arquitectura + Diagnóstico
Día 2: Backend + API + pruebas
Día 3: Documentación + despliegue final + video demo

## Arquitectura híbrida Azure
Infraestructura día 1:
- Azure VM Ubuntu (Standard_D2s)
- Azure App Service PHP
- Integración Microsoft Teams (día 2)

## Setup Infra (IaC)
Prompt usado para infraestructura (IaC) mediante ARM templates.
- La infraestructura inicial fue provisionada en Azure usando VM Standard_D2s y App Service PHP en región Mexico Central.
- Virtual Machine tamaño Standard_D2s (general purpose)
- App Service PHP Linux
- región Mexico Central
- mismos Resource Group
- provisionado manualmente desde Azure Portal

### Entregables día 1
- Repositorio inicial
- Blueprint creado
- Diagrama arquitectura (Draw.io)
- Azure VM provisionada
- Azure App Service creado


## LISTA COMPLETA DE PROMPTS USADOS

"Diagnóstico TecNM cloud gaps México 2025".

"Azure Free Tier hybrid education platform 2025: B1s VM (Mexico Central), App Service PHP, Teams API, VirtualBox private sync. Draw.io diagram + ARM templates".

"ARM template: B1s VM HA + App Service PHP"



# DÍA 2: EJECUCIÓN (Despliegue + Integración)
El objetivo principal de este día fue el desarrollo de la API RESTful con Laravel y la implementación de la capa de acceso a datos. Se logró la conexión estable con el Frontend mediante un túnel público (ngrok).


## LISTA COMPLETA DE PROMPTS USASDOS

### Prompts utilizados por parte del frontend:
"React dashboard: tasks + metrics Azure integration".

"Como establezco la conexión con el backend que está haciendo el desarrolador de backend".

"Como se implementan las métricas de azure en la interfáz".

"Para probar localmmente como puedo conectarme al backend en otra computadora".

"Npm run dev para correr el servidor de frontend".

### Prompst utiliados por parte del backend:

# Backend: Desarrollo de la API de Tareas (Laravel)
El rol de Backend Dev se enfocó en implementar el acceso a la base de datos y exponer la API de lectura de tareas, esencial para la funcionalidad del Task CRUD.

# Prompts utilizados por parte del Backend
"Laravel 11: Implementar Tareas CRUD multitenant, Autenticación de Usuario y Sincronización de Webhook de Teams."

"Generar Base de Datos con Tablas y Datos de Prueba."

"Configurar la Política de Seguridad para Dominio Público."

"ngrok Túnel HTTPS: Comando para exponer 'http://localhost:8000' y generar un endpoint seguro para el consumo por el Frontend Dev."

"Laravel Seeder Script: Generar 3 registros de prueba en la tabla 'tasks' para verificar el endpoint GET /api/tasks y asegurar el 200 OK."

"Git Strategy: Comando para aplicar movimiento de código a la subcarpeta '/backend' y forzar la sincronización (push) con el repositorio remoto."


### Entregables día 2
- App funcional (login + tasks + Teams sync).
- Pruebas load (latencia < 300ms).
- CI/CD pipeline.

# DÍA 3: EVALUACIÓN + PRESENTACIÓN
Se presentó de manerea presencial las diapositivas corresponidentes las cuales representan la arquitectura base de Cloud Edu Hub Mini, también se presentó el inconveniente acerca de que no se pudo desplegar en su totalidad la app en la nube por problemas más grandes que nosotros, pero se logró localmente.

### Entregables día 3
- Repo público (este).
- Video 3min (dobleteamos).
- Informe 8págs.
- URL pública app. (No se logró por los diversos problemas en nube).
