## Project setup

```bash
-> install python
$pip install fastapi uvicorn sqlalchemy mysql-connector-python pydantic python-dotenv

```

## Compile and run the project

```bash
# development
$ uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload


