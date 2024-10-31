from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

# Función de Python que será ejecutada por el operador
def print_hello():
    return 'Hello from PythonOperator!'

# Definición del DAG
with DAG(
    dag_id='my_python_operator_dag',
    default_args={
        'start_date': datetime(2023, 10, 24),
    },
    schedule_interval='@daily',
    catchup=False,
) as dag:
    # Definición del PythonOperator
    hello_task = PythonOperator(
        task_id='hello_task',
        python_callable=print_hello
    )