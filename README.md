


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

# Backend: Desarrollo de la API de Tareas (Laravel)
El rol de Backend Dev (Estudiante 3) se enfocó en implementar el acceso a la base de datos y exponer la API de lectura de tareas, esencial para la funcionalidad del Task CRUD.

# Prompts de Desarrollo (Backend Dev)
"Laravel 12 SaaS multitenant: User auth, task CRUD, Azure metrics dashboard, Teams webhook sync." 

"php artisan make:model Task -m php artisan make:seeder TaskSeeder php artisan migrate:fresh --seed"

"Ajustar 'config/cors.php' con la URL de ngrok y localhost:5173."

"Rutas	Ruta GET /api/tasks implementada con Task::all();"

# Prompts de Despliegue e Integración (DevOps Lead)
"ngrok http 8000"

"ngrok config add-authtoken [TU_CLAVE]"

"git push -u origin main --force"

"GitHub Actions: Laravel Docker build test Include rollback + secrets management."

# DÍA 3: EVALUACIÓN + PRESENTACIÓN
 de32d5d6e126400b5ff58455c4994ec7fdbfcc39
