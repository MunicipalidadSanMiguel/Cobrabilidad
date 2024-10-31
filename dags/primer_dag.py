from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.empty import EmptyOperator
from airflow.operators.python import PythonOperator

TAGS = ['PythonDataFlow']
DAG_ID = "MI_PRIMER_DAG"
DAG_DESCRIPTION = """MI_PRIMER_DAG PARA PROYECTO COBRABILIDAD"""
DAG_SCHEDULE = "0 9 * * *"
default_args = {
    "start_date": datetime(2024, 10, 24),
}
retries = 5
retry_delay = timedelta(minutes=5)

def execute_task():
    print("Increiblemente anda...")

dag = DAG(
    dag_id=DAG_ID,
    description=DAG_DESCRIPTION,
    catchup=False,  
    schedule_interval=DAG_SCHEDULE,
    max_active_runs=1,
    dagrun_timeout=timedelta(minutes=200),  # timeout de 200 minutos
    default_args=default_args,
    tags=TAGS
)

# 2) Crear las tareas que van a estar asociadas a ese DAG

with dag as dag:
    # Primera tarea, lo único que hace es marcar el inicio de la tarea (es un EmptyOperator)
    start_task = EmptyOperator(
        task_id="inicia_proceso"
    )
    # Segunda tarea, lo único que hace es marcar la finalización de la tarea (EmptyOperator)
    end_task = EmptyOperator(
        task_id="finaliza_proceso"
    )

    # Este task va a realizar una tarea específica que es ejecutar mi primer task
    first_task = PythonOperator(
        task_id="first_task",  # simplemente le asigné un task_id
        python_callable=execute_task,  # ejecutará el execute_task que creé más arriba
        retries=retries,  # los reintentos que establecí, que son 2
        retry_delay=retry_delay  # el tiempo de espera para reintentos
    )

# 3) Establecer la dependencia entre cada una de las tareas

start_task >> first_task >> end_task #no se ejecuta una tarea sin que antes no se ejecute la anterior 



